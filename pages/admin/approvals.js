import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../firebase/AuthContext";
import Loader from "../../components/Loader";
import styles from "../../styles/admin/Approvals.module.css";
import Navbar from "../../components/main/Navbar";
import Header from "../../components/main/Header";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { BsCheck, BsX } from "react-icons/bs";
import axios from "axios";

const Approvals = () => {
  const router = useRouter();
  const { userData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingProfiles, setPendingProfiles] = useState();
  const [isButtonIsDisabled, setButtonIsDisabled] = useState(false);

  const removeProfile = (uid) => {
    let prevPendingProfiles = pendingProfiles;
    const newPendingProfiles = prevPendingProfiles.filter((profile) => {
      return profile.uid !== uid;
    });
    setPendingProfiles(newPendingProfiles);
    return;
  };

  useEffect(() => {
    if (userData) {
      if (!userData.status) router.push("/error");
      if (!userData.isAdmin) router.push("/error");
      else {
        axios
          .get("/api/admin/approvals/users")
          .then((response) => {
            if (response.data.status)
              setPendingProfiles(response.data.profiles);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
          <div className={styles.titleText}>Approvals</div>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Grad Year</Th>
                <Th>Approve?</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pendingProfiles.map((profile) => (
                <Tr key={profile.uid}>
                  <Td>{profile.firstName + " " + profile.lastName}</Td>
                  <Td>{profile.personalEmail}</Td>
                  <Td>{profile.graduationYear}</Td>
                  <Td>
                    <IconButton
                      variant="outline"
                      colorScheme="green"
                      aria-label="Call Sage"
                      fontSize="20px"
                      size="sm"
                      style={{ marginRight: "5px" }}
                      icon={<BsCheck />}
                      isDisabled={isButtonIsDisabled}
                      onClick={async () => {
                        setButtonIsDisabled(true);
                        await axios({
                          method: "post",
                          url: "/api/admin/approvals/approve/" + profile.uid,
                        })
                          .then(() => {
                            removeProfile(profile.uid);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                        setButtonIsDisabled(false);
                      }}
                    />
                    <IconButton
                      variant="outline"
                      colorScheme="red"
                      aria-label="Call Sage"
                      fontSize="20px"
                      size="sm"
                      icon={<BsX />}
                      isDisabled={isButtonIsDisabled}
                      onClick={async () => {
                        setButtonIsDisabled(true);
                        await axios({
                          method: "post",
                          url: "/api/admin/approvals/reject/" + profile.uid,
                        })
                          .then(() => {
                            removeProfile(profile.uid);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                        setButtonIsDisabled(false);
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Approvals;
