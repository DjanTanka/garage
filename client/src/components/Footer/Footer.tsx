import React, { FC } from "react";
import { FooterStyleProps } from "../../../store/interfaces";
import {joinUs} from "../../constants";
import styles from "./styles.module.scss";

const Footer: FC<FooterStyleProps> = ({style}) => {
  return (
    <footer className={styles.footer} style={style}>
      Join us:
      <div className={styles.joinUs}>
        {joinUs.map((item) => {
          return (
            <a key={item.title}href={item.link}>
              <img src={item.src} alt={item.title}/>
            </a>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
