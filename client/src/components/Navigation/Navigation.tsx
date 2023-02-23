import React, { FC, useRef, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationProps } from '../../interfaces';
import { selectUser } from '../../../store/slices/user';
import { useRouter } from 'next/dist/client/router';
import { usePlatform } from '../../hooks/usePlatform';
import styles from './Navigation.styles.module.scss';
import { menu } from '../../constants';
import BurgerNav from '../BurgerNav/BurgerNav';
import {useOnClickOutside} from '../../hooks/useOutSideClick'

const Navigation: FC<NavigationProps> = ({
  handleRegistration,
  handleAuthorization,
}) => {
  const router = useRouter();
  const history = useRouter();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleOpenMenu = () => {
    console.log("handleOpenMenu")
    setIsMenuOpen((prev) => !prev);
  };

  const user = useSelector(selectUser);
  const { isActivated, firstName, lastName } = user.userData;

  const isMobile = usePlatform(640) === 'mobile';
  const isPossibleShow = usePlatform(1024) === 'mobile';

  const handleLogOut = () => {
    dispatch({ type: 'LOGOUT_USER', payload: { history } });
  };

  const ref = useRef(null);
  const refBtn = useRef(null);
  useOnClickOutside([ref, refBtn], (e) => setIsMenuOpen(false));
  
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <img src="/logo.svg" alt="logo" />
        <ul className={styles.links}>
          {menu.map((item) => {
            const { name, path } = item;
            return (
              <li key={`${item.name}`}>
                <Link href={`/${path}`}>{name}</Link>
              </li>
            );
          })}
        </ul>
        {router.query.id ? (
          <div className={styles.infoUser}>
            <div style={{ textAlign: 'end' }}>
              {firstName}
              <br />
              {lastName}
            </div>
            <img className={styles.avatarImg} src={'/avatar.png'} />
            <button
              className={styles.logOut}
              disabled={!isActivated && user.status != 'loading...' ? true : false}
              onClick={handleLogOut}
            >
              {' '}
              Log out{' '}
            </button>
          </div>
        ) : (
          <div className={[styles.buttonsNav, styles.burgerCloseTest].join(' ')}>
            <button className={styles.buttonLight} onClick={handleRegistration}>
              {!isMobile && 'First time here?'} {'Sign up!'}
            </button>
            <button className={styles.buttonBlack} onClick={handleAuthorization}>
              Sign in
            </button>
          </div>
        )}
        <div
          className={[styles.burger, isMenuOpen ? styles.burgerClose : ''].join(' ')}
          onClick={handleOpenMenu}
          ref={refBtn}
        >
          <span></span>
        </div>
        {isPossibleShow && (
          <div ref={ref}>
            <BurgerNav
              menu={menu}
              isMenuOpen={isMenuOpen}
              handleRegistration={handleRegistration}
              handleAuthorization={handleAuthorization}
            />
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
