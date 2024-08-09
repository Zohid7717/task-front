export type UserType = {
  id: number ,
  email: string,
  password: string,
  name: string,
  role: string,
  avatar: string
}

export type LogInResType = {
  access_token: string,
  refresh_token: string
}

export type LogInReqType = {
  email: string,
  password: string
}