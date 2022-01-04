import { ChangeEvent, useState } from 'react';

import axios, { AxiosResponse } from 'axios';
import styles from './user.module.css';

import { useRouter } from 'next/router';

import { useMediaQuery } from '../../hooks';

import { Button } from '../../Ui-components/Button/Button';
import { toast } from 'react-toastify';
import { getFontDefinitionFromManifest } from 'next/dist/server/font-utils';

const baseUrl = process.env.NEXT_INTERN_URL;

export const UserComp: React.FC = () => {
  const router = useRouter();
  const device = useMediaQuery();

  const [userPhoto, setUserPhoto] = useState('');

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
        router.push('/');
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

  const handelUpload = async (e: ChangeEvent<any>): Promise<void> => {
    const data = e.target.files[0];

    const formData = new FormData();
    formData.append('image-profile', data, data.name);

    try {
      const res: AxiosResponse = await axios.post(
        `${baseUrl}/api/imageProfile`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            accept: 'application/json'
          },
          onDownloadProgress: progressEvent => {
            // implement the progress
            console.log(
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
                '%'
            );
          }
        }
      );
      console.log(res.data);
      setUserPhoto(res.data as string);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Button
          size={device === 'desktop' ? 'large' : 'small'}
          outline
          label="Signout"
          onClick={signOut}
        />
        <Button
          size={device === 'desktop' ? 'large' : 'small'}
          outline
          label="Change Password"
          onClick={() => router.push('/newPassword')}
        />
        <label className={styles.upload_container}>
          <span className={styles.upload_label} aria-hidden="true">
            Upload a photo
          </span>
          <input
            type="file"
            className={styles.upload_input}
            onChange={e => handelUpload(e)}
            accept="png, jpeg, jpg"
          />
        </label>
        <img
          src={userPhoto}
          alt="userPhoto"
          style={{ width: '20rem', height: '20rem' }}
        />
        The user component{' '}
      </div>
    </>
  );
};
