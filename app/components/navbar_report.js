import styles from "@/app/styles/nav_report.module.css" // Adjust the path accordingly
import Image from 'next/image';

function Nav() {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
          <div className={styles.logoContainer}>
            <Image className={styles.logo} src="/Logo.png"  width={400} height={120} alt='logo'/>
          </div>
      </div>
    </div>
  );
}

export default Nav;
