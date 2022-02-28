import { FC } from 'react';
import styles from './styles.module.scss'

const BunnerAndSearch: FC = () => {

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.bunner}>
          <span>Comfortable service for parking your car</span>
        </div>
        <div className={styles.searchBlock}>
          <input
            className={styles.input}
            placeholder="Enter parking place..."
          />
          <button className={styles.buttonForSearch}>Search</button>
        </div>
      </main>
    </div>
  );
};

export default BunnerAndSearch;
