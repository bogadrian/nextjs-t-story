import { atom } from 'recoil';

export const userRecoil = atom({
  key: 'userRecoil',
  default: {
    photo: '',
    role: '',
    _id: '',
    name: '',
    email: '',
    passwordChangedAt: new Date(Date.now())
  }
});
