import styles from "../styles/Home/Login.module.css";
import { useState, useEffect, useContext } from "react";
import { Button } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/router";

import { signUpWithGoogle } from "../firebase/authentication";
import { AuthContext } from "../firebase/AuthContext";

import Loader from "../components/Loader";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    if (userData === null) return;
    // To ensure loading screen keeps going until user data is found
    else {
      if (userData.status === true) {
        console.log(userData);
        if (userData.isVerified) router.push("/home");
        else if (userData.isAdmin) router.push("/admin");
        else if (userData.formSubmitted && userData.pendingApproval)
          router.push("/pending");
        else if (!userData.isVerified && userData.formSubmitted)
          router.push("/error");
        else setIsLoading(false);
      } else if (userData.status === false) {
        setIsLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  // if (isLoading) return <Loader />

  return isLoading ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h2>{`PCT Zeta's People Platform`}</h2>
        <h1 className={styles.titleText}>Welcome to Meteor!</h1>
        <Button
          onClick={signUpWithGoogle}
          colorScheme="twitter"
          leftIcon={<FaGoogle />}
        >
          Sign up / Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
