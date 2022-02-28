import { History } from 'history' //какой-то гребанный костыль?
import { Dispatch, SetStateAction } from 'react';
import { UseTableOptions } from 'react-table/index'
export default interface IUserDto {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  balance: number
  isActivated: boolean
  actNum: String
  verifyCodeSent: boolean
}
export interface IUserSlice {
  userData: IUserDto
  status: string
}
export interface IUsers {
  getAllUsersForChecking: IUserDto[]
}

export interface IUserById {
  getUserById: IUserDto
}

export interface ICar {
  _id: string | number;
  userId?:string | number;
  garageId?: string | number;
  model?: string;
  registrationNumber?: string;
  vinCode?: string;
  mileage?: number;
  vehicalWeare?: number; 
  details?: [ICarDetails]
  del?: ''
}
export interface ICarDetails {
  carId: string | number
  unitType: string
  installed: number
  resource: number
  needToChange: number
  condition: string
}
export interface IGarage {
  id: string;
  userId: string | number;
  cars: ICar[];
  quantityPlaces: number;
}

export interface IOrder {
  _id: string | number;
  garageId: string;
  userId: string
  carId: string
  masterId: string
  title: string
  description: string
  priority: string
  status: string
  dateAdd: string
  dateStart: string
  dateEnd: string

}

export interface IState {
  user: IUserSlice[],
  users: IUserDto[],
  garages: IGarage[],
  cars: ICar[],
  orders: IOrder[]
}
export interface ICreateUserPayload {
  type: string
  payload: {
    history: History
    firstName: string
    lastName: string
    email: string
    password: string
    setAttention: Dispatch<SetStateAction<boolean>>
    setinfoAttention: Dispatch<SetStateAction<string>>
  }
}
export interface IActivateUserPayload {
  type: string
  payload: {
    email: string,
    verifyCode: string
    setAttention: Dispatch<SetStateAction<boolean>>
    setinfoAttention: Dispatch<SetStateAction<string>>
  }
}
export interface IgetUserByIDPayload {
  type: string
  payload: {
    id: string
    isUserActivated: boolean
  }
}

export interface ITokens {
  login:{
    tokenA: string
    tokenR: string
    user: IUserDto
  }
}

export interface AuthModalProps {
  setIsAuthModalOpen: Dispatch<SetStateAction<boolean>>
  setinfoAttention:Dispatch<SetStateAction<string>>
  setAttention:Dispatch<SetStateAction<boolean>>
}


export interface TableAppProps extends Omit<UseTableOptions<ICar>, 'title'> {
  title: string
  data: ICar[]
};

export interface NavigationProps  {
  isMenuOpen: boolean
  handleRegistration?: () => void
  handleAuthorization?: () => void
  handleOpenMenu?: () => void
};

export interface FooterStyleProps {
  style?: {
    position?: 'absolute' | 'static' ,
    bottom?: '0px'
  }
}