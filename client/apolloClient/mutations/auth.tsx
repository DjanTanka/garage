import {gql} from '@apollo/client';
import { client } from '../../pages/_app';

export async function createUser(input: any ) {
  const { data } = await client.mutate({
    mutation: gql`
      mutation createUser ($userInput: UserInput) {
        createUser(userInput: $userInput) {
          _id,
          email,
          firstName,
          lastName,
          isActivated,
          actNum,
        }
      }
    `,
    variables: input
  })
  return data.createUser 
}


export async function activateUser(input: any) {
  const { data } = await client.mutate ({
    mutation: gql`
      mutation activateUser ($userActivateInput: UserActivateInput) {
        activateUser(userActivateInput: $userActivateInput) {
          _id,
          email,
          firstName,
          lastName,
          isActivated,
        }
      }
    `,
    variables: input
  })
  return data.activateUser
}