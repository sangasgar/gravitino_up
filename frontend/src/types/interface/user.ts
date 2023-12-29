export interface IUser {
    user_id: number
    login: string
    createdAt: string
    updatedAt: string
    role: IRole
    organization: IOrganization
    person: IPerson
    group: any
}
  
export interface IRole {
  role_id: number
  role_name: string
  createdAt: string
  updatedAt: string
}

export interface IOrganization {
  organization_id: number
  organization_type_id: number
  organization_name: string
  phone: string
  address: string
  email: string
  ogrn: string
  inn: string
  kpp: string
  okpo: string
  createdAt: string
  updatedAt: string
}

export interface IPerson {
  person_id: number
  last_name: string
  first_name: string
  patronymic: string
  gender: any
  phone: any
  createdAt: string
  updatedAt: string
}