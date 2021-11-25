import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import { Login } from './login';
import { Signup } from './signup';
import { ForgotPassword } from './forgotPassword';
import { Button } from '../../Ui-components/Button/Button';

import { useMediaQuery } from '../../hooks';

import styles from './auth.module.css';

interface Props {}
export const AuthComp: React.FC<Props> = () => {
  const router = useRouter();
  const device = useMediaQuery();
  const [mode, setMode] = useState<string>('login');

  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    if (false) {
      router.replace('/');
    }
    () => {
      mounted.current = false;
    };
  }, [router]);

  console.log(mode);

  return (
    <>
      <div className={styles.buttons}>
        <div style={{ marginRight: '1rem' }}>
          {mode === 'login' ? (
            <Button
              size={device === 'desktop' ? 'large' : 'small'}
              primary
              label="Login"
              onClick={() => setMode('login')}
            />
          ) : (
            <Button
              size={device === 'desktop' ? 'large' : 'small'}
              secondary
              label="Login"
              onClick={() => setMode('login')}
            />
          )}
        </div>
        {mode === 'signup' ? (
          <Button
            size={device === 'desktop' ? 'large' : 'small'}
            primary
            label="Signup"
            onClick={() => setMode('signup')}
          />
        ) : (
          <Button
            size={device === 'desktop' ? 'large' : 'small'}
            secondary
            label="Signup"
            onClick={() => setMode('signup')}
          />
        )}
      </div>

      {mode === 'login' ? (
        <Login device={device} setMode={() => setMode('forgotPassword')} />
      ) : mode === 'signup' ? (
        <Signup device={device} loginAfterSignUp={() => setMode('login')} />
      ) : mode === 'forgotPassword' ? (
        <>
          <ForgotPassword
            device={device}
            setModeLogin={() => setMode('login')}
          />
        </>
      ) : null}
    </>
  );
};
