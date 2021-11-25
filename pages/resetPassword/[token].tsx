import { useRouter } from 'next/router';
import { ResetPasswordComp } from '../../src/components/auth/forgotPassword';

import styles from '../styles/auth.module.css';

interface Props {
  session: any;
}
const ResetPassword: React.FC<Props> = () => {
  const router = useRouter();
  const { token } = router.query;
  return (
    <div className={styles.container}>
      <ResetPasswordComp token={token} />
    </div>
  );
};

export default ResetPassword;
