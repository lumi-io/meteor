import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../firebase/AuthContext";
import Loader from "../../components/Loader";
import styles from "../../styles/admin/Approvals.module.css";
import Navbar from "../../components/main/Navbar";
import Header from "../../components/main/Header";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { BsCheck, BsX } from "react-icons/bs";

const Admin = () => {
  const router = useRouter();
  const { userData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(userData);
    if (userData) {
      if (!userData.isAdmin) router.push("/error");
      else setIsLoading(false);
    } else {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <Navbar />
      <Header />
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.titleText}>Admin</div>
          <p>{`you know you're pretty cool`}</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
