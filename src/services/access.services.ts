import { AxiosResponse } from 'axios'

import { api } from './api'
import {
  ReduxAccessGetLoginServiceParameters
  // AccessResetPasswordParameters,
  // AccessResetPasswordVerifyCodeParameters,
  // AccessServiceResetPasswordChangePasswordParameters
} from '../redux/types'

async function getLogOut(): Promise<AxiosResponse> {
  return await api.get('access/logout')
}

// async function accessResetPassword({
//   userLogin
// }: AccessResetPasswordParameters): Promise<AxiosResponse> {
//   return await api.get('access/reset-password', {
//     params: {
//       user_login: userLogin
//     }
//   })
// }

// async function accessResetPasswordVerifyCode({
//   token
// }: AccessResetPasswordVerifyCodeParameters): Promise<AxiosResponse> {
//   return await api.get('access/reset-password/verify-code', {
//     params: { token }
//   })
// }

// async function accessResetPasswordChangePassword({
//   token,
//   password
// }: AccessServiceResetPasswordChangePasswordParameters): Promise<AxiosResponse> {
//   return await api.get('access/reset-password/change-password', {
//     params: { token, user_pass: password }
//   })
// }

async function checkAuthentication(): Promise<AxiosResponse> {
  return await api.get('/access/check-authentication')
}

async function getLogin({
  email,
  password
}: ReduxAccessGetLoginServiceParameters): Promise<AxiosResponse> {
  return await api.get('/access/login', { params: { email, password } })
}

export const accessService = {
  checkAuthentication,
  getLogin,
  getLogOut
  // accessResetPassword,
  // accessResetPasswordVerifyCode,
  // accessResetPasswordChangePassword
}
