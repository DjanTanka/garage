const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Order {
  _id: ID!
  garageId: String!
  userId: String!
  carId: String!
  masterId: String!
  title: String!
  description: String!
  priority: String!
  status: String!
  dateAdd: String!
  dateStart: String!
  dateEnd: String!
}

type User {
  _id: ID!
  email: String!
  password: String!
  firstName: String!
  lastName: String!
  role: String!
  balance: Int!
  isActivated: Boolean!
  actNum: String
}

type Garage {
  _id: ID!
  userId: String!
  location: String!
  rent: Int!
  freeSpace: Int!
  totalSpace: Int!
}

type Car {
  _id: ID!
  userId: String
  garageId: ID
  model: String
  registrationNumber: String
  vinCode: String
  mileage: String
  vehicalWeare: Int
  details: [Details]
}

type Details {
  carId: ID
  unitType: String
  installed: Int
  resource: Int
  needToChange: Int
  condition: String
}

type AuthData {
  tokenA: String!
  tokenR: String!
  user: User
}

input OrderInput {
  garageId: String!
  carId: String!
  masterId: String!
  userId: String!
  title: String!
  description: String!
}

input UserInput {
  email: String!
  password: String!
  firstName: String!
  lastName: String!
}

input UserActivateInput {
  email: String!
  actNum: String!
}

input GetNewActNumInput {
  email: String!
}

input ChangePasswordInput {
  email: String!
  actNum: String!
  firstPassword: String! 
  secondPassword: String! 
}

input GarageInput {
  userId: ID!
  location: String!
  rent: Int!
  freeSpace: Int!
}

input CarInput {
  userId: String!
  garageId: ID
  model: String!
  registrationNumber: String!
  carDate: String!
  vinCode: String
  mileage: String!
  details: [DetailsInput]
}

input DetailsInput {
  carId: ID!
  unitType: String!
  installed: Int!
  resource: Int!
  needToChange: Int!
  condition: String!
}

input GarageInputUpdate {
  _id: ID!
  userId: ID!
  location: String!
  rent: Int!
  freeSpace: Int!
  totalSpace: Int!
}

input OrderInputUpdate {
  _id: ID!
  garageId: String!
  carId: String!
  masterId: String!
  userId: String!
  title: String!
  description: String!
  priority: String!
  status: String!
  dateAdd: String!
  dateStart: String!
  dateEnd: String!
}

input CarInputUpdate {
  _id: ID!
  userId:ID!
  garageId: ID!
  model: String!
  registrationNumber: String!
  vinCode: String!
  mileage: Int!
  details: [DetailsInput]
}

input DetailsInputUpdate {
  index: Int!
  carId: ID
  unitType: String
  installed: Int
  resource: Int
  needToChange: Int
  condition: String
}

input UserInputUpdate {
  email: String!
  role: String!
}

input UserLoginInput {
  email: String!,
  password: String!,
  googleId: String,
  firstName: String,
  lastName: String
}

type RootQuery {
  login(userLoginInput: UserLoginInput): AuthData
  orders: [Order!]!
  garages: [Garage!]!
  cars(userId: ID):  [Car]!
  refreshCheck: AuthData!
  getUserById(id: String!): User
  getAllUsersForChecking: [User!]
}

type RootMutation {
  createUser(userInput: UserInput): User
  activateUser(userActivateInput: UserActivateInput): User
  getNewActNum(getNewActNumInput: GetNewActNumInput): User
  changePassword(changePasswordInput: ChangePasswordInput): User
  changeUserRole(userInputUpdate: UserInputUpdate): User
  deleteUser(email: String!): User

  createOrder(orderInput: OrderInput): Order
  deleteOrder(id: String!): Order
  updateOrder(orderInputUpdate: OrderInputUpdate): Order
   
  createGarage(garageInput: GarageInput): Garage
  eleteGarage(id: String!): Garage
  updateGarage(garageInputUpdate: GarageInputUpdate): Garage

  createCar(carInput: CarInput): [Car]
  deleteCar(id: ID!): [Car]
  getVechiacalWeare(car: CarInput): Car
  updateCar(carInputUpdate: CarInputUpdate): Car
  addDetail(detailInput: DetailsInput): Car
  deleteDetail(unitType: String!, carId: String!): Car
  updateDetail(detailsInputUpdate: DetailsInputUpdate): Car
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);
