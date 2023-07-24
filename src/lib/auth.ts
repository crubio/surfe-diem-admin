import {loginWithEmailAndPassword, LoginCredentialsDTO, LoginResponse} from '@features/auth'
import {UseLocalStorage, PREFIX} from '@utils/storage'

async function handleUserResponse(data: LoginResponse) {
  const { access_token } = data;
  const {setItem} = UseLocalStorage();
  if (data) {
    setItem(`${PREFIX}token`, access_token);
  }
  return
}

async function logoutFn(): Promise<void> {
  const {removeItem} = UseLocalStorage();
  removeItem(`${PREFIX}token`);
  window.location.assign(window.location.origin as unknown as string);
}

async function loginFn(data: LoginCredentialsDTO): Promise<LoginResponse> {
  const response = await loginWithEmailAndPassword(data);
  await handleUserResponse(response)
  return response
}

const auth = {
  login: loginFn,
  logout: logoutFn,
}

export default auth