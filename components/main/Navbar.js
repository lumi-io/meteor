import styles from "../../styles/components/main/Navbar.module.css";
import { BsPersonCheck } from "react-icons/bs";
import { FaHome, FaUserCheck } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          src="/logo.svg"
          alt="Picture of the author"
          width={250}
          height={30}
        />
      </div>
      <ul>
        <Link href="/admin" passHref>
          <div className={styles.navigationButton}>
            <FaHome className={styles.icon} />
            <p className={styles.navigationButtonText}>Home</p>
          </div>
        </Link>
        <Link href="/admin/approvals" passHref>
          <div className={styles.navigationButton}>
            <FaUserCheck className={styles.icon} />
            <p className={styles.navigationButtonText}>Approvals</p>
          </div>
        </Link>
        <div className={styles.navigationButton}>
          <MdSettings className={styles.icon} />
          <p className={styles.navigationButtonText}>Settings</p>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
