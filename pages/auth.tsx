import { AuthComp } from '../src/components/auth';
import { UserComp } from '../src/components/userProfile';
import { useRecoilValue } from 'recoil';
import { isLoggedIn } from '../src/recoil';

import styles from './styles/auth.module.css';

interface Props {
  session: any;
}
const Auth: React.FC<Props> = () => {
  const isUserLoggedIn = useRecoilValue(isLoggedIn);

  return (
    <div className={styles.container}>
      {isUserLoggedIn ? <UserComp /> : <AuthComp />}
    </div>
  );
};

export async function getServerSideProps(context: any) {
  return {
    props: {}
  };
}

export default Auth;
