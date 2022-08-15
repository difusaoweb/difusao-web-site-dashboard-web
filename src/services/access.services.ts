import { AxiosResponse } from 'axios'

import { api } from './api'
import {
  GetLogInParametersService,
  AccessSignUpParameters,
  AccessResetPasswordParameters,
  AccessResetPasswordVerifyCodeParameters,
  AccessServiceResetPasswordChangePasswordParameters
} from '../types'

export const accessService = {
  getLogIn,
  getLogOut,
  getIsAuthenticated,
  accessSignUp,
  accessResetPassword,
  accessResetPasswordVerifyCode,
  accessResetPasswordChangePassword
}
async function getLogIn({
  email,
  password
}: GetLogInParametersService): Promise<AxiosResponse> {
  return await api.get('access/login', { params: { email, password } })
}
async function getLogOut(): Promise<AxiosResponse> {
  return await api.get('access/logout')
}

async function accessSignUp({
  userLogin,
  userPass,
  userEmail,
  displayName
}: AccessSignUpParameters): Promise<AxiosResponse> {
  return await api.get('users/create', {
    params: {
      user_login: userLogin,
      user_pass: userPass,
      user_email: userEmail,
      display_name: displayName
    }
  })
}

async function accessResetPassword({
  userLogin
}: AccessResetPasswordParameters): Promise<AxiosResponse> {
  return await api.get('access/reset-password', {
    params: {
      user_login: userLogin
    }
  })
}

async function accessResetPasswordVerifyCode({
  token
}: AccessResetPasswordVerifyCodeParameters): Promise<AxiosResponse> {
  return await api.get('access/reset-password/verify-code', {
    params: { token }
  })
}

async function accessResetPasswordChangePassword({
  token,
  password
}: AccessServiceResetPasswordChangePasswordParameters): Promise<AxiosResponse> {
  return await api.get('access/reset-password/change-password', {
    params: { token, user_pass: password }
  })
}
async function getIsAuthenticated(): Promise<AxiosResponse> {
  return await api.get('access/authenticated')
}
