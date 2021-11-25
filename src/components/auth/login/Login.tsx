import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import { useForm, Controller } from 'react-hook-form';
import { isEmail } from '../../../utilis/isEmail';
import { IUser } from '../../../../custom-types';

import { isLoggedIn } from '../../../recoil';
import { useRecoilState } from 'recoil';

import { Input } from '../../../Ui-components/Input/Input';
import { Button } from '../../../Ui-components/Button/Button';
import { Spinner } from '../../../Ui-components/Spinner';
import { Svg } from '../../../Ui-components/assets/svg/Svg';
import { toast } from 'react-toastify';
const baseUrl = process.env.NEXT_INTERN_URL;

import styles from '../auth.module.css';

interface Props {
  device: string;
  setMode: () => void;
}

interface FormValues {
  email: string;
  password: string;
}

export const Login: React.FC<Props> = ({ device, setMode }) => {
  const [, setIsLogged] = useRecoilState(isLoggedIn);
  const { handleSubmit, control, reset } = useForm<FormValues>();
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setloading(true);
    const { email, password } = data;

    try {
      const res: AxiosResponse<unknown, any> = await axios.post(
        `${baseUrl}/api/login`,
        {
          email,
          password
        },
        { headers: { accept: '*/*', ContentType: 'application/json' } }
      );

      const { user } = res.data as { user: IUser };

      if (user) {
        setloading(false);
        setIsLogged(true);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Login success', {
          position: toast.POSITION.TOP_RIGHT
        });
        reset();
      }
    } catch (err) {
      reset();
      setloading(false);
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
        <span>LOGIN</span>
        {!loading && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.input}>
              <Controller<FormValues>
                control={control}
                name="email"
                rules={{
                  required: true,
                  validate: v => isEmail(v) || 'Email not valid'
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error }
                }) => (
                  <>
                    <Input
                      handleChange={onChange}
                      label="email"
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
                  </>
                )}
              />
            </div>
            <div className={styles.password}>
              <Controller<FormValues>
                control={control}
                name="password"
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
                      label="password"
                      type={visible ? 'text' : 'password'}
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
              <div
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                style={{ cursor: 'pointer' }}
              >
                <Svg
                  name="eye"
                  classNames={`${styles['eye']} ${styles[`eye-${device}`]}`}
                />
              </div>
            </div>
            <div className={styles.submit}>
              <Button
                size={device === 'desktop' ? 'large' : 'small'}
                outline
                label="Login"
                onClick={() => {}}
                type="submit"
              />
            </div>
          </form>
        )}
        {loading && <Spinner />}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            cursor: 'pointer'
          }}
        >
          <p onClick={() => setMode()} style={{ fontSize: '1.4rem' }}>
            forgot password?
          </p>
        </div>
      </div>
    </div>
  );
};
