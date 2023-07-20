import {loginWithEmailAndPassword, getUser, LoginCredentialsDTO, LoginResponse, AuthUser} from '@features/auth'
import {useLocalStorage, PREFIX} from '@utils/storage'

async function handleUserResponse(data: LoginResponse): Promise<AuthUser> {
  const { access_token } = data;
  const {setItem} = useLocalStorage();
  setItem(`${PREFIX}token`, access_token);
  const user = await getUser();
  return user
}

async function logoutFn(): Promise<void> {
  const {removeItem} = useLocalStorage();
  removeItem(`${PREFIX}token`);
  window.location.assign(window.location.origin as unknown as string);
}

async function loginFn(data: LoginCredentialsDTO): Promise<AuthUser> {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response)
  return user
}

const auth = {
  login: loginFn,
  logout: logoutFn,
}

export default auth