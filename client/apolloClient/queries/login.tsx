import {gql} from '@apollo/client';
import { client } from '../../pages/_app';

export async function loginUser(input: any){
  const { data } = await client.query({
    query: gql
    `
      query login ($userLoginInput: UserLoginInput ) {
        login (userLoginInput: $userLoginInput) {
          tokenA
          tokenR
          user {
            _id
            firstName
            lastName
            role
            balance
            isActivated
          }
        }
      }
    `,
    variables: input
  })
  return data;
}
