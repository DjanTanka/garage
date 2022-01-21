import {gql} from '@apollo/client';
import { client }  from '../../pages/_app';

export async function createCar(input: any ) {
  const { data } = await client.mutate({
    mutation: gql`
      mutation createCar ($carInput: CarInput) {
        createCar(carInput: $carInput) {
          _id,
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
    variables: input
  })
  return data.createCar 
}

export async function deleteCar(input: any ) {
  const { data } = await client.mutate({
    mutation: gql`
      mutation deleteCar ($id: ID!) {
        deleteCar(id: $id) {
          _id,
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
    variables: input
  })
  return data.deleteCar 
}

export async function getVehicalWeare() {
  const { data } = await client.mutate({
    mutation: gql`
    mutation getVehicalWeare($car: CarInput)
      getVechicalWeare(car: $car){
        _id,
        userId
        garageId
        model
        registrationNumber
        vinCode
        mileage
        vechicalWeare
      }
    `
  })
}