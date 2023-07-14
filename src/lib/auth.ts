import {loginWithEmailAndPassword, getUser, LoginCredentialsDTO, LoginResponse, AuthUser} from '@features/auth'
import storage from '@utils/storage'

async function handleUserResponse(data: LoginResponse): Promise<AuthUser> {
  const { access_token } = data;
  storage.setToken(access_token);
  const user = await getUser();
  return user
}

async function logoutFn(): Promise<void> {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

async function LoginFn(data: LoginCredentialsDTO): Promise<AuthUser> {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response)
  return user
}

const authConfig = {
  login: LoginFn,
  logout: logoutFn,
}

export default authConfig