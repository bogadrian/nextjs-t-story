import { atom } from 'recoil';

export const isLoggedIn = atom({
  key: 'isLoggedIn',
  default: false
});

export const newPassword = atom({
  key: 'newPassword',
  default: false
});
