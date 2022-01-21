import {gql} from '@apollo/client';
import { client } from '../../pages/_app';

export async function cars(input: string | number) {
  const { data } = await client.query({
    query: gql
    `
      query cars($id: ID!) {
        cars(userId: $id) {
          _id
          userId
          garageId
          model
          registrationNumber
          vinCode
          mileage
          vehicalWeare
        }
      }
    `,
    variables: {id: input}
  })
  return data.cars
}