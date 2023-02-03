import axios from 'axios';
import { z } from 'zod';
import { removeJWTs, storeJWTs } from '../../services/TokenService';
import { getIdentityUrl, getRequestHeaders } from '../../util/url';

type IdentityAction = 'signup' | 'login' | 'reset' | 'confirm';

type IdentityRequestData = {
  act: IdentityAction;
  username?: string;
  password?: string;
  password2?: string;
  new_password?: string;
  confirmation_code?: string;
  UserType?: 'admin';
};

export type LoginRequestData = Required<
  Pick<IdentityRequestData, 'username' | 'password'>
>;
export type RegisterRequestData = Required<
  Pick<IdentityRequestData, 'username' | 'password' | 'password2'>
> &
  Pick<IdentityRequestData, 'UserType'>;

export type VerifyRequestData = Required<
  Pick<IdentityRequestData, 'username' | 'confirmation_code'>
>;
export type ResendRequestData = Required<Pick<IdentityRequestData, 'username'>>;
export type ResetPasswordRequestData = Required<Pick<IdentityRequestData, 'username'>>;
export type ConfirmResetRequestData = Required<
  Pick<IdentityRequestData, 'username' | 'new_password' | 'confirmation_code'>
>;

const SignUpResponseSchema = z.object({
  CodeDeliveryDetails: z.object({
    AttributeName: z.string(),
    DeliveryMedium: z.string(),
    Destination: z.string(),
  }),
  UserConfirmed: z.boolean(),
  UserSub: z.string(),
});

type SignUpResponse = z.infer<typeof SignUpResponseSchema>;

export const identityInstance = axios.create({
  baseURL: getIdentityUrl(),
  method: 'post',
});

/**
 * @param loginData
 */
export const logInRequest = async (loginData: LoginRequestData) => {
  // eslint-disable-next-line no-param-reassign
  loginData.password = encodeURIComponent(loginData.password);

  const response = await identityInstance.request<void>({
    url: '/login',
    data: loginData,
    headers: getRequestHeaders('unprotected'),
  });
  storeJWTs({
    idToken: response.headers.id_token,
    accessToken: response.headers.access_token,
    refreshToken: response.headers.refresh_token,
  });
};

/**
 * @param registerData
 */
export const signUpRequest = async (registerData: RegisterRequestData) => {
  // eslint-disable-next-line no-param-reassign
  registerData.password = encodeURIComponent(registerData.password);
  // eslint-disable-next-line no-param-reassign
  registerData.password2 = encodeURIComponent(registerData.password2);

  const response = await identityInstance.request<SignUpResponse>({
    url: `/signup`,
    data: registerData,
    headers: getRequestHeaders('unprotected'),
  });
  return SignUpResponseSchema.parse(response.data);
};

export const verifyRequest = async (verifyData: VerifyRequestData) => {
  await identityInstance.request<void>({
    url: `/confirm`,
    data: verifyData,
    headers: getRequestHeaders('unprotected'),
  });
};

export const resendCodeRequest = async (resendData: ResendRequestData) => {
  await identityInstance.request<void>({
    url: `/resend`,
    data: resendData,
    headers: getRequestHeaders('unprotected'),
  });
};

export const postLogout = async () => {
  await identityInstance
    .request<void>({
      url: '/logout',
      headers: getRequestHeaders('protected'),
    })
    .catch((error) => {
      // Even if the logout API call fails, the state of the editor will have been
      // updated (cleared tokens, reset isLoggedIn), so we should just catch this
      // error and log it.
      console.error(error);
    })
    .finally(() => {
      // Remove JWTs even if request failed.
      removeJWTs();
    });
};

export const resetPasswordRequest = async (
  resetPasswordData: ResetPasswordRequestData
) => {
  await identityInstance.request<void>({
    url: `/reset`,
    data: resetPasswordData,
    headers: getRequestHeaders('unprotected'),
  });
};

export const confirmResetRequest = async (confirmResetData: ConfirmResetRequestData) => {
  // eslint-disable-next-line no-param-reassign
  confirmResetData.new_password = encodeURIComponent(confirmResetData.new_password);

  await identityInstance.request<void>({
    url: `/confirmreset`,
    data: confirmResetData,
    headers: getRequestHeaders('unprotected'),
  });
};
