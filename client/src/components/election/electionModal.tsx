import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { FormikControl } from "formik-react-bootstrap";
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router";
import * as yup from "yup";
import { CreateElectionMutation } from "../../queries/CreateElection";
import { GetElectionsQuery } from "../../queries/GetElections";
import { CreateElection, CreateElectionVariables } from "../../queries/types/CreateElection";
import { GetElections } from "../../queries/types/GetElections";
import { UpdateElection, UpdateElectionVariables } from "../../queries/types/UpdateElection";
import { UpdateElectionMutation } from "../../queries/UpdateElection";

export interface ElectionModalProps {
  show: boolean,
  onHide: () => any,
}

interface UpdateElectionModalProps extends ElectionModalProps {
  id: string,
  name: string,
  seats: number,
  startTime: string,
  finishTime: string,
  description: string,
}

interface FormValues {
  name: string,
  seats: number,
  startTime: string,
  finishTime: string,
  description: string,
}

const FormSchema = yup.object().shape({
  name: yup.string().required(),
  seats: yup.number().min(1).required(),
  startTime: yup.date().required(),
  finishTime: yup.date().min(yup.ref("startTime")).required(),
  description: yup.string(),
});

export const ElectionModal = (
  props: UpdateElectionModalProps | ElectionModalProps,
): JSX.Element => {
  const history = useHistory();
  const [createElection] = useMutation<CreateElection, CreateElectionVariables>(
    CreateElectionMutation,
    { errorPolicy: "all" },
  );
  const [updateElection] = useMutation<UpdateElection, UpdateElectionVariables>(
    UpdateElectionMutation,
    { errorPolicy: "all" },
  );

  const onSubmit = (values: FormValues): Promise<any> => {
    if ("id" in props) {
      return updateElection({
        variables: {
          id: props.id,
          name: values.name,
          startTime: new Date(values.startTime).toISOString(),
          finishTime: new Date(values.finishTime).toISOString(),
          description: values.description,
        },
      }).then(() => {
        props.onHide();
      });
    } else {
      return createElection({
        variables: {
          name: values.name,
          seats: values.seats,
          startTime: new Date(values.startTime).toISOString(),
          finishTime: new Date(values.finishTime).toISOString(),
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
        history.push(`/elections/${data?.createElection.slug ?? ""}`);
      });
    }
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {
            "id" in props ?
              "Update Election"
              :
              "Create Election"
          }
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          name: (props as UpdateElectionModalProps).name ?? "",
          seats: (props as UpdateElectionModalProps).seats ?? 1,
          startTime: (props as UpdateElectionModalProps).startTime === undefined
            ? ""
            : new Date(new Date((props as UpdateElectionModalProps).startTime).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16),
          finishTime: (props as UpdateElectionModalProps).finishTime === undefined
            ? ""
            : new Date(new Date((props as UpdateElectionModalProps).finishTime).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16),
          description: (props as UpdateElectionModalProps).description ?? "",
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
                  type="text"
                  label="Name"
                  name="name" />
                <FormikControl
                  type="number"
                  label="Seats"
                  name="seats"
                  min="1" />
                <FormikControl
                  type="datetime-local"
                  label="Start Time"
                  name="startTime" />
                <FormikControl
                  type="datetime-local"
                  label="Finish Time"
                  name="finishTime" />
                <FormikControl
                  as="textarea"
                  label="Description"
                  name="description" />
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="success" disabled={isSubmitting}>
                  {
                    "id" in props ?
                      "Update Election"
                      :
                      "Create Election"
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
