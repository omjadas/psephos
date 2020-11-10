import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { FormikControl } from "formik-react-bootstrap";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as yup from "yup";
import { CreateCandidateMutation } from "../../queries/CreateCandidate";
import { GetElectionQuery } from "../../queries/GetElection";
import { CreateCandidate, CreateCandidateVariables } from "../../queries/types/CreateCandidate";
import { GetElection, GetElectionVariables } from "../../queries/types/GetElection";
import { UpdateCandidate, UpdateCandidateVariables } from "../../queries/types/UpdateCandidate";
import { UpdateCandidateMutation } from "../../queries/UpdateCandidate";

interface CandidateModalProps {
  show: boolean,
  onHide: () => any,
}

interface CreateCandidateModalProps extends CandidateModalProps {
  electionId: string,
  electionSlug: string,
}

interface UpdateCandidateModalProps extends CandidateModalProps {
  id: string,
  name: string,
  description: string,
}

interface FormValues {
  name: string,
  description: string,
}

const FormSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
});

export const CandidateModal = (
  props: CreateCandidateModalProps | UpdateCandidateModalProps,
): JSX.Element => {
  const [createCandidate] = useMutation<CreateCandidate, CreateCandidateVariables>(
    CreateCandidateMutation,
    { errorPolicy: "all" },
  );
  const [updateCandidate] = useMutation<UpdateCandidate, UpdateCandidateVariables>(
    UpdateCandidateMutation,
    { errorPolicy: "all" },
  );

  const onSubmit = (values: FormValues): Promise<any> => {
    if ("id" in props) {
      return updateCandidate({
        variables: {
          id: props.id,
          name: values.name,
          description: values.description,
        },
      }).then(() => {
        props.onHide();
      });
    } else {
      return createCandidate({
        variables: {
          name: values.name,
          description: values.description,
          election: props.electionId,
        },
        update: (cache, { data }) => {
          try {
            const election = cache.readQuery<GetElection, GetElectionVariables>({
              query: GetElectionQuery,
              variables: {
                slug: props.electionSlug,
              },
            });

            if (
              data?.createCandidate !== undefined &&
              election?.election !== undefined
            ) {
              cache.writeQuery<GetElection, GetElectionVariables>({
                query: GetElectionQuery,
                variables: {
                  slug: props.electionSlug,
                },
                data: {
                  election: {
                    ...election.election,
                    candidates: [
                      ...election.election.candidates,
                      {
                        ...data.createCandidate,
                        elected: null,
                      },
                    ],
                  },
                },
              });
            }
          } catch (e: unknown) {
            // do nothing
          }
        },
      }).then(() => {
        props.onHide();
      });
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {
            "id" in props ?
              "Update Candidate"
              :
              "Create Candidate"
          }
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: (props as UpdateCandidateModalProps).name ?? "",
          description: (props as UpdateCandidateModalProps).description ?? "",
        }}
        validationSchema={FormSchema}
        onSubmit={onSubmit}
      >
        {
          ({
            handleSubmit,
            isSubmitting,
          }) => (
            <Form id="createElection" onSubmit={handleSubmit}>
              <Modal.Body>
                <FormikControl
                  label="Name"
                  type="text"
                  name="name" />
                <FormikControl
                  label="Description"
                  as="textarea"
                  name="description" />
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="success" disabled={isSubmitting}>
                  {
                    "id" in props ?
                      "Update Candidate"
                      :
                      "Create Candidate"
                  }
                </Button>
              </Modal.Footer>
            </Form>
          )
        }
      </Formik>
    </Modal>
  );
};
