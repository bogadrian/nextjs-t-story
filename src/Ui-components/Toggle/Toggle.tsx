import { useEffect, useState } from 'react';
import styles from './toggle.module.css';

interface ToggleProps {
  size?: 'small' | 'large';
}

export const Toggle: React.FC<ToggleProps> = ({ size = 'large', ...props }) => {
  const [activeTheme, setActiveTheme] = useState<string>();
  const inactiveTheme = activeTheme === 'light' ? 'dark' : 'light';

  useEffect(() => {
    setActiveTheme(document.body.dataset.theme);
  }, []);
  useEffect(() => {
    if (activeTheme) {
      // read the new active theme on setActiveTheme
      document.body.dataset.theme = activeTheme;
      // set it in the local storage also for the next time the app is refreshed
      window?.localStorage.setItem('theme', activeTheme);
    }
  }, [activeTheme]);

  return (
    <div
      className={`${styles['toggle-container']} ${
        styles[`toggle-container-${size}`]
      }`}
      aria-label={`Change to ${inactiveTheme} mode`}
    >
      <input type="checkbox" onClick={() => setActiveTheme(inactiveTheme)} />
      <div
        className={`${styles['slider']} ${styles[`slider-${size}`]} ${
          styles['round']
        }`}
      ></div>
    </div>
  );
};
