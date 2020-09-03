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

export interface CandidateModalProps {
  id?: string,
  name?: string,
  description?: string,
  electionId: string,
  electionSlug: string,
  show: boolean,
  onHide: () => any,
}

interface FormValues {
  name: string,
  description: string,
}

const FormSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
});

export const CandidateModal = (props: CandidateModalProps): JSX.Element => {
  const [createCandidate] = useMutation<CreateCandidate, CreateCandidateVariables>(
    CreateCandidateMutation,
    { errorPolicy: "all" }
  );

  const onSubmit = (values: FormValues): Promise<any> => {
    if (props.id === undefined) {
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
                      data.createCandidate,
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
    } else {
      // update
      return Promise.resolve();
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Election</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: props.name ?? "",
          description: props.description ?? "",
        }}
        validationSchema={FormSchema}
        onSubmit={onSubmit}
      >
        {
          ({
            handleSubmit,
            isSubmitting,
          }) => (
            <Form id="createElection" onSubmit={handleSubmit as any}>
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
                  Create Candidate
                </Button>
              </Modal.Footer>
            </Form>
          )
        }
      </Formik>
    </Modal>
  );
};
