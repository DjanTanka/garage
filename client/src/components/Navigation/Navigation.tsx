import React, {FC} from "react";
import {NavigationProps} from "../../../store/interfaces";
import styles from "./styles.module.scss";
import {menu} from "../../constants";

const Navigation: FC<NavigationProps> = ({
  isMenuOpen,
  handleRegistration,
  handleAuthorization,
  handleOpenMenu,
}) => {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <img src="/logo.png" alt="logo" className={styles.mylogo} />
        <ul className={styles.links}>
          {menu.map((item) => (
            <li key={`${item}`}>{item}</li>
          ))}
        </ul>
        <div className={[styles.buttonsSign, styles.burgerCloseTest].join(" ")}>
          <button className={styles.buttonLight} onClick={handleRegistration}>
            First time here? Sign up!
          </button>
          <button className={styles.buttonBlack} onClick={handleAuthorization}>
            Sign in
          </button>
        </div>
        <div
          className={[styles.burger, isMenuOpen ? styles.burgerClose : ""].join(
            " "
          )}
          onTouchStart={handleOpenMenu}
        >
          <span></span>
        </div>
        {isMenuOpen && <div className={styles.menu}></div>}
      </nav>
    </div>
  );
};

export default Navigation;
