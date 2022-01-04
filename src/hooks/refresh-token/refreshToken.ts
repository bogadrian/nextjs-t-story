import { useEffect, useState } from 'react';

import axios from 'axios';
import { isAfter, subDays } from 'date-fns';

import { useRouter } from 'next/router';

const baseUrl = process.env.NEXT_INTERN_URL;

export const useRefreshToken = (expiresRefresh: number) => {
  const router = useRouter();
  const [isRequired, setIsRequired] = useState(false);

  useEffect(() => {
    //subtract 2 days
    const expirationDateMinus2Days = subDays(new Date(expiresRefresh), 2);

    //find if date now is after dateExpires minus 2 days
    const isNowAfter = isAfter(
      new Date(Date.now()),
      new Date(expirationDateMinus2Days)
    );

    if (isNowAfter && expiresRefresh) {
      setIsRequired(true);
    }
  }, [expiresRefresh]);

  useEffect(() => {
    if (isRequired && expiresRefresh) {
      (async () => {
        try {
          await axios.get(`${baseUrl}/api/cronJobRefreshToken`);
          setIsRequired(false);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [isRequired, expiresRefresh]);
};
