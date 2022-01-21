import {gql} from '@apollo/client';
import { client } from '../../pages/_app';

export async function getAllUsers(){
  const { data } = await client.query({
    query: gql
    `
      query getAllUsersForChecking {
        getAllUsersForChecking {
          firstName
        }
      }
    `
  })
  return data;
}

export async function getUserById(input: string) {
  const { data } = await client.query({
    query: gql
    `
      query getUserById($id: String!) {
        getUserById(id: $id) {
          firstName,
          lastName,
          isActivated,
          email,
        }
      }
    `,
    variables: {id: input}
  })
  return data
}
