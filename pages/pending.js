import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../firebase/AuthContext";
import Loader from "../components/Loader";
import styles from "../styles/Pending.module.css";
import Header from "../components/main/Header";

const Pending = () => {
  const router = useRouter();
  const { userData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      console.log(userData)
      if (userData.isVerified) router.push("/home");
      else if (userData.isAdmin) router.push("/admin/approvals")
      else if (!userData.isVerified && !userData.pendingApproval)
        router.push("/error");
      else setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={styles.container}>
    <Header />
      <div className={styles.titleText}>Thanks for being patient!</div>
      <div className={styles.subtitleText}>{`We'll send you an email when we've reviewed your information.`}</div>
    </div>
  );
};

export default Pending;
