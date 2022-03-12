import styles from "../../styles/components/main/Header.module.css";
import { MdLogout } from "react-icons/md";
import { signOut } from "firebase/auth";
import init from "../../firebase/init";
import { useRouter } from "next/router";

const auth = init.auth;

const Header = () => {
  const router = useRouter();
  const logout = async () => {
    console.log("hit");
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
    router.push("/");
  };
  return (
    <div className={styles.container}>
      <div className={styles.navigationButton} onClick={logout}>
        <MdLogout />
        <p className={styles.navigationButtonText}>Logout</p>
      </div>
    </div>
  );
};

export default Header;
