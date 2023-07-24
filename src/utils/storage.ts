export const PREFIX = 'surfe_diem_';

// old way, also good.
// const storage = {
//   getToken: () => {
//     return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`) as string);
//   },
//   setToken: (token: string) => {
//     window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
//   },
//   clearToken: () => {
//     window.localStorage.removeItem(`${storagePrefix}token`);
//   },
// };

// export default storage;

// Hook way, fine too.
export const UseLocalStorage = () => {

  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const getItem = (key: string) => {
    const value = localStorage.getItem(key);
    return value;
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  return { setItem, getItem, removeItem };
};