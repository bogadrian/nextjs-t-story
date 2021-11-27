import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import { useForm, Controller } from 'react-hook-form';
import { isEmail } from '../../../utilis/isEmail';
import { toast } from 'react-toastify';
import { Input } from '../../../Ui-components/Input/Input';
import { Button } from '../../../Ui-components/Button/Button';
import { Spinner } from '../../../Ui-components/Spinner';
import { Svg } from '../../../Ui-components/assets/svg/Svg';

import styles from '../auth.module.css';

interface Props {
  device: string;
  loginAfterSignUp: () => void;
}

export type FormValues = {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const Signup: React.FC<Props> = ({ device, loginAfterSignUp }) => {
  const { handleSubmit, control, getValues, reset } = useForm<FormValues>();
  const [visible, setVisible] = useState(false);
  const [wasSuccess, setWasSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    const { userName, email, password, passwordConfirm } = data;

    try {
      const res: AxiosResponse<unknown, any> = await axios.post(
        `http://localhost:3000/api/signup`,
        {
          userName,
          email,
          password,
          passwordConfirm
        },
        { headers: { accept: '*/*', ContentType: 'application/json' } }
      );

      console.log('eeeeee', res.data);
      if (
        res?.data &&
        (res.data as { message: string }).message === 'success'
      ) {
        toast.success('User created successfully. Please confirm your email!', {
          position: toast.POSITION.TOP_CENTER
        });
        setWasSuccess(true);
        reset();
      }
      if (
        (res.data as { statusCode: number }).statusCode === 400 ||
        (res.data as { message: string }).message === 'Something went wrong'
      ) {
        toast.error((res.data as { message: string }).message, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } catch (err) {
      console.log('wwwww', err);
      reset();
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
    <div className={`${styles['container']} ${styles[`container-${device}`]}`}>
      <div className={styles.inner}>
        <span style={{ marginBottom: '3rem' }}>SIGNUP</span>
        {!wasSuccess && !loading && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputs}>
              <Controller<FormValues>
                control={control}
                name="userName"
                rules={{
                  required: true,
                  validate: v =>
                    v.length >= 2 || 'Name must be more than 1 character!'
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error }
                }) => (
                  <>
                    <Input
                      handleChange={onChange}
                      label="name"
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
            <div className={styles.inputs}>
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
                    v.length >= 8 || 'Password must be at least 8 characters!'
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
            <div className={styles.passwordConfirm}>
              <Controller<FormValues>
                control={control}
                name="passwordConfirm"
                rules={{
                  required: true,
                  validate: (v: string) => {
                    const { password } = getValues();
                    return v === password || 'Confirm password is diffrent!';
                  }
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { invalid, error }
                }) => (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Input
                      handleChange={onChange}
                      label="confirm password"
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
                label="Signup"
                onClick={() => {}}
                type="submit"
              />
            </div>
          </form>
        )}

        {wasSuccess && !loading && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <h2>User created! Confirm your email then login!</h2>

            <Button
              size={device === 'desktop' ? 'large' : 'small'}
              outline
              label="Login"
              onClick={loginAfterSignUp}
              type="click"
            />
          </div>
        )}
        {loading && <Spinner />}
      </div>
    </div>
  );
};
