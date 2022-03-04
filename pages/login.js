import styles from "../styles/Home/Login.module.css";
import { useState, useEffect, useContext } from "react";
import { Button } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/router";

import { signUpWithGoogle } from "../firebase/authentication";
import { AuthContext } from "../firebase/AuthContext";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    if (userData) {
      if (userData.isVerified) router.push("/home");
      else router.push("/welcome");
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return isLoading ? (
    "loading"
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
