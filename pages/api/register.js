import db from "../../firebase/init-admin";

export default async function handler(req, res) {
  try {
    const uid = req.body.uid;
    if (req.method === "POST") {
      const docRef = await db.collection("profile").doc(uid).set(req.body);
      const userRef = db.collection("users").doc(uid);
      await userRef.update({
        formSubmitted: true,
        pendingApproval: true,
      });
      // console.log(res);
      res.status(201).end()
    }
  } catch (err) {
    console.log(err);
  }
}
