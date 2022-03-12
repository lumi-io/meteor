import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../firebase/AuthContext";
import Loader from "../components/Loader";
import styles from "../styles/Welcome.module.css";
import { Button } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
} from "@chakra-ui/react";

import axios from "axios";
import { Formik, Form, Field } from "formik";

const Welcome = () => {
  const router = useRouter();
  const { userData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      if (userData.isVerified) router.push("/home");
      else if (userData.isAdmin) router.push("/admin");
      else if (userData.formSubmitted && userData.pendingApproval)
        router.push("/pending");
      else if (!userData.isVerified && userData.formSubmitted)
        router.push("/error");
      else setIsLoading(false);
    } else {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.titleText}>Welcome to Meteor!</div>
        <div className={styles.subtitleText}>
          {`Let's get to know a little about you.`}
        </div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            graduationYear: "",
            college: "",
            family: "",
            class: "",
            major: "",
            minor: "",
            phoneNumber: "",
            personalEmail: "",
          }}
          validate={(values) => {
            //   console.log(userData.data)
          }}
          onSubmit={async (values, actions) => {
            let data = values;
            data["uid"] = userData.data.uid;
            await axios({
              method: "post",
              url: "/api/register",
              data: values,
            })
              .then(() => {
                router.push("/pending");
              })
              .catch((err) => {
                console.log(err);
                actions.setSubmitting(false);
              });
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            //   actions.setSubmitting(false);
            // }, 400);
          }}
        >
          {(props) => (
            <Form>
              <div className={styles.inputRowContainer}>
                <div className={styles.rowLeftMargin}>
                  <Field name="firstName">
                    {({ field, form }) => (
                      <FormControl isRequired>
                        <FormLabel htmlFor="firstName">First name</FormLabel>
                        <Input {...field} id="firstName" />
                        <FormErrorMessage>
                          {props.errors.firstName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
                <div className={styles.rowRightMargin}>
                  <Field name="lastName">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                        isRequired
                      >
                        <FormLabel htmlFor="lastName">Last Name</FormLabel>
                        <Input {...field} id="lastName" />
                        <FormErrorMessage>
                          {props.errors.lastName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
              </div>
              <div className={styles.inputRowContainer}>
                <div className={styles.rowLeftMargin}>
                  <Field name="graduationYear">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                        isRequired
                      >
                        <FormLabel htmlFor="graduationYear">
                          Graduation Year
                        </FormLabel>
                        <Input {...field} id="graduationYear" />
                        <FormErrorMessage>
                          {props.errors.lastName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
                <div className={styles.rowRightMargin}>
                  <Field name="college">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                        isRequired
                      >
                        <FormLabel htmlFor="college">School/College</FormLabel>
                        <Input {...field} id="college" />
                        <FormErrorMessage>
                          {props.errors.lastName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </div>
              </div>
              <div className={styles.inputContainer}>
                <Field name="family">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                      isRequired
                    >
                      <FormLabel htmlFor="family">Family</FormLabel>
                      <Input {...field} id="family" />
                      <FormErrorMessage>
                        {props.errors.lastName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
              <div className={styles.inputContainer}>
                <Field name="class">
                  {({ field, form }) => (
                    <FormControl isRequired>
                      <FormLabel htmlFor="class">Class</FormLabel>
                      <Select {...field} id="class" placeholder="Select Class">
                        <option>Iota</option>
                        <option>Kappa</option>
                        <option>Lambda</option>
                        <option>Mu</option>
                        <option>Nu</option>
                        <option>Xi</option>
                        <option>Omicron</option>
                      </Select>
                      <FormErrorMessage>{props.errors.class}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
              <div className={styles.inputContainer}>
                <Field name="major">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                      isRequired
                    >
                      <FormLabel htmlFor="major">Major</FormLabel>
                      <Input {...field} id="major" />
                      <FormErrorMessage>
                        {props.errors.lastName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
              <div className={styles.inputContainer}>
                <Field name="minor">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel htmlFor="minor">Minor</FormLabel>
                      <Input {...field} id="minor" />
                      <FormErrorMessage>
                        {props.errors.lastName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
              <div className={styles.inputContainer}>
                <Field name="phoneNumber">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                      isRequired
                    >
                      <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                      <Input {...field} id="phoneNumber" />
                      <FormErrorMessage>
                        {props.errors.lastName}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
              <div className={styles.inputContainer}>
                <Field name="personalEmail">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel htmlFor="personalEmail">
                        Personal Email
                      </FormLabel>
                      <Input {...field} id="personalEmail" />
                      <FormErrorMessage>
                        {props.errors.personalEmail}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </div>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
                isFullWidth
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Welcome;
