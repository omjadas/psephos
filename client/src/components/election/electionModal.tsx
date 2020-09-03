import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router";
import { CreateElectionMutation } from "../../queries/CreateElection";
import { GetElectionsQuery } from "../../queries/GetElections";
import { CreateElection, CreateElectionVariables } from "../../queries/types/CreateElection";
import { GetElections } from "../../queries/types/GetElections";
import * as yup from "yup";
import { FormikControl } from "formik-react-bootstrap";

export interface ElectionModalProps {
  id?: string,
  name?: string,
  description?: string,
  show: boolean,
  onHide: () => any,
}

interface ElectionValues {
  name: string,
  description: string,
}

const ElectionSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
});

export const ElectionModal = (props: ElectionModalProps): JSX.Element => {
  const history = useHistory();
  const [createElection] = useMutation<CreateElection, CreateElectionVariables>(
    CreateElectionMutation,
    { errorPolicy: "all" }
  );

  const onSubmit = (values: ElectionValues): Promise<any> => {
    if (props.id === undefined) {
      return createElection({
        variables: {
          name: values.name,
          description: values.description,
        },
        update: (cache, { data }) => {
          try {
            const elections = cache.readQuery<GetElections>({
              query: GetElectionsQuery,
            });

            if (
              data?.createElection !== undefined &&
              elections?.elections !== undefined
            ) {
              cache.writeQuery<GetElections>({
                query: GetElectionsQuery,
                data: {
                  elections: [...elections.elections, data.createElection],
                },
              });
            }
          } catch (e: unknown) {
            // do nothing
          }
        },
      }).then(({ data }) => {
        props.onHide();
        history.push(`/elections/${data?.createElection.slug}`);
      });
    } else {
      return Promise.resolve();
      // update
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
        validationSchema={ElectionSchema}
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
                  type="text"
                  label="Name"
                  name="name" />
                <FormikControl
                  as="textarea"
                  label="Description"
                  name="description" />
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="success" disabled={isSubmitting}>
                  Create Election
                </Button>
              </Modal.Footer>
            </Form>
          )
        }
      </Formik>
    </Modal>
  );
};
