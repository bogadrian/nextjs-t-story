import styles from './sideDrawer.module.css';
import { CSSTransition } from 'react-transition-group';
import { Svg } from '../../Ui-components/assets/svg/Svg';
import { HamburgerButton } from '../../Ui-components/HamburgerButton';
import { sideDrawerAtom } from '../../recoil/sideDrawerAtom';
import { useRecoilValue } from 'recoil';

interface Props {}
export const SideDrawer: React.FC<Props> = () => {
  const sideDrwaerState = useRecoilValue(sideDrawerAtom);
  return (
    <CSSTransition
      in={sideDrwaerState}
      timeout={500}
      classNames="drawer_animation"
      mountOnEnter
      unmountOnExit
    >
      <div className={styles.container_sideDrawer}>
        <div className={styles.sideDrwaer_header}>
          <div
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <Svg name="logo" classNames={styles.logo} />
            <div style={{ fontSize: '3rem', marginLeft: '1rem' }}>
              One Day Travel
            </div>
          </div>
          <div>
            <HamburgerButton size="large" />
          </div>
        </div>
        <div className={styles.sideDrwaer_content}>content</div>
        <div className={styles.sideDrwaer_footer}>footer</div>
      </div>
    </CSSTransition>
  );
};
