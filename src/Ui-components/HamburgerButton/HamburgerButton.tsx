import styles from './hamburgerButton.module.css';
import { sideDrawerAtom } from '../../recoil/sideDrawerAtom';
import { useRecoilState } from 'recoil';
interface Props {
  size?: string;
}

export const HamburgerButton: React.FC<Props> = ({ size }) => {
  const [sideDrwaerState, setSideDrwaerState] = useRecoilState(sideDrawerAtom);
  return (
    <div
      className={styles[`hamburger-container-${size}`]}
      onClick={() => setSideDrwaerState(!sideDrwaerState)}
    >
      <input
        type="checkbox"
        id="hamburger"
        checked={sideDrwaerState}
        className={styles['hamburger-input']}
        onChange={() => setSideDrwaerState(!sideDrwaerState)}
      />
      <label htmlFor="hamburger" className={styles[`hamburger-icon-${size}`]}>
        &nbsp;
      </label>
    </div>
  );
};
