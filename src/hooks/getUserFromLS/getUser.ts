import { useEffect, useState } from 'react';

export const useGetUser = () => {
  const [user, setUser] = useState({
    photo: '',
    role: '',
    _id: '',
    name: '',
    email: '',
    passwordChangedAt: new Date(Date.now())
  });

  useEffect(() => {
    const userFromLS = localStorage.getItem('user');

    console.log('user', userFromLS);
    if (userFromLS) {
      setUser(JSON.parse(userFromLS));
    }
  }, []);

  return user;
};
