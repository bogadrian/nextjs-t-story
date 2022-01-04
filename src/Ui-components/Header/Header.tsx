import { useState, useEffect } from 'react';
import styles from './header.module.css';
import Image from 'next/image';

import { IUser } from '../../../custom-types';

import { sideDrawerAtom } from '../../recoil/sideDrawerAtom';
import axios, { AxiosResponse } from 'axios';
import { useRecoilValue } from 'recoil';
import { isLoggedIn } from '../../recoil';

import Link from 'next/link';

import { Toggle } from '../Toggle';
import { HamburgerButton } from '../HamburgerButton';
import { Input } from '../Input';
import { Svg } from '../assets/svg/Svg';
import { SideDrawer } from '../../components/sideDrawer';
import { Backdrop } from '../../components/backdrop';

import { useGetUser } from '../../hooks/getUserFromLS';



interface Props {
  device: string;
 
}
export const Header: React.FC<Props> = ({ device }) => {
  const [value, setValue] = useState<string>('');
  const isLogged = useRecoilValue(isLoggedIn);
  const sideDrwaerState = useRecoilValue(sideDrawerAtom);
  const [userPhoto, setUserPhoto] = useState<any>();

  const user = useGetUser();

  console.log('user photo', user.photo);
  return (
    <>
      {device !== 'desktop' && <SideDrawer />}
      {sideDrwaerState && <Backdrop />}
      <header
        className={`${styles['header_container']} ${
          styles[`header_container-${device}`]
        }`}
      >
        {user.photo && (
          <Image src={user.photo} alt="aa" width={500} height={500} />
        )}

        <div
          className={`${styles['innerContainer']} ${
            styles[`innerContainer-${device}`]
          }`}
        >
          <div className={styles.left}>
            <Svg
              name="logo"
              classNames={`${styles['logo']} ${styles[`logo-${device}`]}`}
            />

            <Toggle size={device === 'desktop' ? 'large' : 'small'} />

            <div
              className={`${styles['left_input']} ${
                styles[`left_input-${device}`]
              }`}
            >
              <Input
                label="Search"
                handleChange={e => setValue(e.target.value)}
                value={value}
                type="text"
                size={device}
              />
              <Svg
                name="search"
                classNames={`${styles['search']} ${styles[`search-${device}`]}`}
              />
            </div>
          </div>
          <div className={styles.header_right}>
            {device !== 'desktop' && (
              <HamburgerButton
                size={device === 'desktop' ? 'large' : 'small'}
              />
            )}
            {device === 'desktop' && (
              <div style={{ marginBottom: '1rem' }}>
                <Link href="/">
                  <a>
                    <Svg
                      name="home"
                      classNames={`${styles['logo']} ${
                        styles[`logo-${device}`]
                      }`}
                    />
                  </a>
                </Link>
                <Link href="/auth">
                  <a>
                    {!isLogged && !userPhoto ? (
                      <Svg
                        name="login"
                        classNames={`${styles['logo']} ${
                          styles[`logo-${device}`]
                        }`}
                      />
                    ) : (
                      <Svg
                        name="user"
                        classNames={`${styles['logo']} ${
                          styles[`logo-${device}`]
                        }`}
                      />
                    )}
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
