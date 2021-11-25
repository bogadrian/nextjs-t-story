import styles from './spinner.module.css';

export const Spinner: React.FC = () => (
  <div className={styles.spinner_center}>
    <div className={styles.spinner}></div>
  </div>
);
