export type UserType = {
  id: number | null,
  email: string | null,
  password: string | null,
  name: string | null,
  role: string,
  avatar: string | null
}

export type LogInResType = {
  access_token: string,
  refresh_token: string
}

export type LogInReqType = {
  email: string,
  password: string
}