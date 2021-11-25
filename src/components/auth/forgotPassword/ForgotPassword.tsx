import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { isEmail } from '../../../utilis/isEmail';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '../../../Ui-components/Input/Input';
import { Button } from '../../../Ui-components/Button/Button';
import { Spinner } from '../../../Ui-components/Spinner';
import { IUser } from '../../../../custom-types';

import { toast } from 'react-toastify';
const baseUrl = process.env.NEXT_INTERN_URL;

import styles from '../auth.module.css';

interface Props {
  device: string;
  setModeLogin: () => void;
}

interface FormValues {
  email: string;
}

export const ForgotPassword: React.FC<Props> = ({ device, setModeLogin }) => {
  const { handleSubmit, control, getValues } = useForm<FormValues>();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const { email } = data;
    try {
      const res: AxiosResponse<any> = await axios.post(
        `${baseUrl}/api/forgotPassword`,
        {
          email
        },
        { headers: { accept: '*/*', ContentType: 'application/json' } }
      );
      console.log('userrrr', res.data);
      const { message } = res.data as { message: string };

      if (message === 'success') {
        toast.success('Reset Email Sent', {
          position: toast.POSITION.TOP_RIGHT
        });
        setLoading(false);
        setSuccess(true);
      }
    } catch (err) {
      setLoading(false);
      toast.error('Email Not Found. Please check your email!', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {!success && <span> Please tell us your registration email!</span>}
        {!loading && !success && (
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

            <div className={styles.submit}>
              <Button
                size={device === 'desktop' ? 'large' : 'small'}
                outline
                label="Reset Password"
                onClick={() => {}}
                type="submit"
              />
            </div>
          </form>
        )}
        {loading && <Spinner />}
        {success && (
          <>
            <p>Reset Email Sent!</p>
            <Button
              size={device === 'desktop' ? 'large' : 'small'}
              outline
              label="Login"
              onClick={() => setModeLogin()}
            />
          </>
        )}
      </div>
    </div>
  );
};
