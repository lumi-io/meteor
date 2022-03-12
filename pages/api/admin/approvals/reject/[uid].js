import db from "../../../../../firebase/init-admin";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { uid } = req.query;
      const userRef = db.collection("users").doc(uid);
      await userRef.update({
        pendingApproval: false,
        isVerified: false,
      });
      res.status(204).end();
    }
  } catch (err) {
    console.log(err);
  }
}
