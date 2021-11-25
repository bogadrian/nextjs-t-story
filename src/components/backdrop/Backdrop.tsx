import styles from './backdrop.module.css';
import { sideDrawerAtom } from '../../recoil/sideDrawerAtom';
import { useRecoilState } from 'recoil';

interface Props {}
export const Backdrop: React.FC<Props> = () => {
  const [sideDrwaerState, setSideDrwaerState] = useRecoilState(sideDrawerAtom);
  return (
    <div
      className={styles.container_backdrop}
      onClick={() => setSideDrwaerState(!sideDrwaerState)}
    />
  );
};
