import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation CreateTask($input: TaskInput!) {
    createTask(input: $input) {
      id
      status
    }
  }
`;

export const GET_TASK_STATUS = gql`
  query GetTaskStatus($id: ID!) {
    task(id: $id) {
      id
      status
    }
  }
`;
