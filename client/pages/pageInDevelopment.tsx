import Link from 'next/link';
import styles from './PageInDevelopment.module.scss';

const PageInDevelopment = () => {
  return (
    <div className={styles.inWorkSection}>
      <h1 className={styles.title}>Раздел в разработке...</h1>
      <Link href={"/"}>
        <img className={styles.logo} src="/logo.svg" alt="logo"/>
      </Link>
    </div>
  );
};

export default PageInDevelopment;
