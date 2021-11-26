import axios, { AxiosResponse } from 'axios';
import styles from './user.module.css';

import router, { useRouter } from 'next/router';

import { useMediaQuery } from '../../hooks';

import { Button } from '../../Ui-components/Button/Button';
import { toast } from 'react-toastify';

const baseUrl = process.env.NEXT_INTERN_URL;

export const UserComp: React.FC = () => {
  const device = useMediaQuery();

  const signOut = async () => {
    try {
      const res: AxiosResponse<unknown, any> = await axios.get(
        `${baseUrl}/api/signOut`,
        {
          headers: { accept: '*/*', ContentType: 'application/json' }
        }
      );

      console.log('res.data', res);
      if (res.data === 'success') {
        localStorage.setItem('user', JSON.stringify({}));
        toast.success('Signout success', {
          position: toast.POSITION.TOP_RIGHT
        });
        router.push('./auth');
      }
    } catch (err) {
      toast.error(
        `Error:
       ${(err as any)?.response.status} ${(err as any)?.response.data} `,
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
    }
  };
  return (
    <div className={styles.container}>
      <Button
        size={device === 'desktop' ? 'large' : 'small'}
        outline
        label="Signout"
        onClick={signOut}
        type="submit"
      />
      The user component{' '}
    </div>
  );
};
