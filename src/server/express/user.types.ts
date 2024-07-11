import { Dayjs } from 'dayjs'

export interface UserResponse {
  username: string;
  uid: string;
}

export interface UserProfileResponse {
  userUid: string
  address: string
  birthdate: string
}

export interface UserProfile extends UserProfileResponse {
  age: number
  birthday: Dayjs
}