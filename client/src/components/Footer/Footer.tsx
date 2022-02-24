import React from "react";
import {joinUs} from "../../constants";
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      Join us:
      <div className={styles.joinUs}>
        {joinUs.map((item) => {
          return (
            <a href={item.link}>
              <img src={item.src} alt={item.title}/>
            </a>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
