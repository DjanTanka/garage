import React, { FC } from 'react';
import Link from 'next/link';
import { BurgerNavProps } from '../../../src/interfaces';
import { usePlatform } from '../../hooks/usePlatform';
import styles from './BurgerNav.styles.module.scss';

const BurgerNav: FC<BurgerNavProps> = ({ menu, isMenuOpen, handleRegistration, handleAuthorization}) => {
  const isMobile = usePlatform(470) === 'mobile';

  return (
    <div className={[styles.wrapper, isMenuOpen ? styles.wrapperOpen : ''].join(' ')}>
      {menu.map((item) => {
        const { name, path } = item;
        return (
          <li key={`${item.name}`}>
            <Link href={`/${path}`}>{name}</Link>
          </li>
        );
      })}
      {isMobile && (
        <>
          <li onClick={handleRegistration}>First time here? Sign up!</li>
          <li onClick={handleAuthorization}>Sign in</li>
        </>
      )}
    </div>
  );
};

export default BurgerNav;
