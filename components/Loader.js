import { Spinner,  } from "@chakra-ui/react";
import styles from "../styles/Loader.module.css"

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <Spinner size="xl" />
    </div>
  );
};

export default Loader;
