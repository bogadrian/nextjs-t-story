import { NewPassword } from '../src/components/auth/newPassword';

import styles from './styles/auth.module.css';

const NewPasswordPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <NewPassword />
    </div>
  );
};

export default NewPasswordPage;
