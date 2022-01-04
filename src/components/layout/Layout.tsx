import React from 'react';
import styles from './layout.module.css';

import { useRecoilValue } from 'recoil';
import { isLoggedIn } from '../../recoil';

import { useMediaQuery } from '../../hooks/mediaQuery';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const isLogged = useRecoilValue(isLoggedIn);
  const device = useMediaQuery();

  return (
    <div className={styles.layout_container}>
      <div
        className={
          device === 'desktop' ? styles.content_desktop : styles.content_mobile
        }
      >
        {!isLogged && (
          <div
            style={{
              position: 'absolute',
              color: 'red',
              left:
                device === 'desktop'
                  ? '40%'
                  : device === 'tablet'
                  ? '40%'
                  : '25%',
              top: '1rem',
              fontSize: device === 'desktop' ? '2rem' : '1.6rem'
            }}
          >
            Please Login to use fully the app!
          </div>
        )}
        <div className={styles.childrens}>{children}</div>
      </div>
    </div>
  );
};
