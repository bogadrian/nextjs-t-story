import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

import { useRouter } from 'next/router';

import { useForm, Controller } from 'react-hook-form';

import loadingGif from '../../../../public/loading.gif';
import Image from 'next/image';

import { IUser } from '../../../../custom-types';
import { useMediaQuery } from '../../../hooks';
import { Input } from '../../../Ui-components/Input/Input';
import { Button } from '../../../Ui-components/Button/Button';
import { Spinner } from '../../../Ui-components/Spinner';
import { Svg } from '../../../Ui-components/assets/svg/Svg';
import { toast } from 'react-toastify';
const baseUrl = process.env.NEXT_INTERN_URL;

import styles from '../auth.module.css';

interface Props {
  token: string | string[] | undefined;
}

interface FormValues {
  password: string;
  confirmPassword: string;
}

export const ResetPasswordComp: React.FC<Props> = ({ token }) => {
  const router = useRouter();
  const device = useMediaQuery();
  const { handleSubmit, control, reset, watch } = useForm<FormValues>();
  const [resetSuccess, setResetSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loaderPassword, setLoaderPassword] = useState(false);
  const [passwordIsOk, setPasswordIsOk] = useState('');
  const [newPass, setNewPass] = useState('');

  useEffect(() => {
    watch(val => {
      setTimeout(() => {
        setNewPass(val.password!);
      }, 2000);
    });
  }, [watch]);

  useEffect(() => {
    if (newPass?.length >= 8) {
      setLoaderPassword(true);

      (async () => {
        try {
          const { data } = await axios.post(
            `${baseUrl}/api/sameLastPassword`,
            {
              password: newPass,
              token,
              url: 'auth/samePassword'
            },
            {
              headers: { accept: '*/*', ContentType: 'application/json' }
            }
          );

          if (data && (data as AxiosResponse<any>)?.data) {
            setLoaderPassword(false);
            setPasswordIsOk('true');
            toast.success('The password you choose is ok!', {
              position: toast.POSITION.TOP_RIGHT
            });
          } else {
            setLoaderPassword(false);
            setPasswordIsOk('false');
            toast.error(
              "You can't use the same password! Please chose a new one!",
              {
                position: toast.POSITION.TOP_RIGHT
              }
            );
          }
        } catch (err) {
          setLoaderPassword(false);
          setPasswordIsOk('false');
          toast.error('Error fetching your last password', {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      })();
    }
  }, [token, newPass]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const { password } = data;
    try {
      const res: AxiosResponse<unknown, any> = await axios.post(
        `${baseUrl}/api/resetPassword`,
        {
          password,
          token
        },
        { headers: { accept: '*/*', ContentType: 'application/json' } }
      );

      const { user } = res.data as { user: IUser };

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Password changed successfully!', {
          position: toast.POSITION.TOP_RIGHT
        });
        setResetSuccess(true);
        setLoading(false);
        reset();
      }
    } catch (err) {
      reset();
      setLoading(true);
      toast.error(
        `Error:
          ${(err as { message: string }).message}`,
        {
          position: toast.POSITION.TOP_RIGHT
        }
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {resetSuccess && !loading ? (
          <span style={{ marginBottom: '3rem' }}>
            You reseted your password successfully! Please login now!
          </span>
        ) : (
          <span style={{ marginBottom: '10rem' }}>NEW PASSWORD</span>
        )}
        {loading && !resetSuccess && <Spinner />}
        {!resetSuccess && !loading && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.password}>
              <Controller<FormValues>
                control={control}
                name="password"
                rules={{
                  required: true,
                  validate: v => {
                    return (
                      v.length >= 8 || 'Password must be a least 8 characters!'
                    );
                  }
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error }
                }) => (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Input
                      handleChange={onChange}
                      label="new password"
                      type="text"
                      value={value}
                      size={device}
                      invalid={invalid}
                    />
                    <p
                      style={{
                        fontSize: '1.5rem',
                        color: 'red',
                        marginTop: '-0.6rem'
                      }}
                    >
                      {error?.message}
                    </p>
                    {loaderPassword && (
                      <div style={{ position: 'absolute', left: '90%' }}>
                        <Image
                          src={loadingGif}
                          alt="loading"
                          height="24"
                          width="24"
                        />
                      </div>
                    )}
                    {!loaderPassword && passwordIsOk === 'true' && (
                      <Svg
                        name="checked"
                        classNames={`${styles['eye']} ${
                          styles[`eye-${device}`]
                        }`}
                      />
                    )}
                    {!loaderPassword && passwordIsOk === 'false' && (
                      <Svg
                        name="x"
                        classNames={`${styles['eye']} ${
                          styles[`eye-${device}`]
                        }`}
                      />
                    )}
                  </div>
                )}
              />
            </div>

            <div className={styles.password}>
              <Controller<FormValues>
                control={control}
                name="confirmPassword"
                rules={{
                  required: true,
                  validate: v =>
                    v.length >= 8 || 'Password must be a least 8 characters!'
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error }
                }) => (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Input
                      handleChange={onChange}
                      label="confirm new password"
                      type="text"
                      value={value}
                      size={device}
                      invalid={invalid}
                    />
                    <p
                      style={{
                        fontSize: '1.5rem',
                        color: 'red',
                        marginTop: '-0.6rem'
                      }}
                    >
                      {error?.message}
                    </p>
                  </div>
                )}
              />
            </div>

            <div className={styles.submit}>
              <Button
                size={device === 'desktop' ? 'large' : 'small'}
                outline
                label="Reset"
                onClick={() => {}}
                type="submit"
              />
            </div>
          </form>
        )}
        {resetSuccess && (
          <Button
            size={device === 'desktop' ? 'large' : 'small'}
            outline
            label="Login"
            onClick={() => router.push('/auth')}
          />
        )}
      </div>
    </div>
  );
};
