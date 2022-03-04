import init from "../../firebase/init";

const db = init.db;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const docRef = doc(db, "profile", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("data exists");
      return;
    } else {
      await setDoc(doc(db, "profile", user.uid), data);
    }
  }
}

// if user is logged in,
// Get user info, process to get needed data
// receive JSON object of user registration data
// submit and post to database.
