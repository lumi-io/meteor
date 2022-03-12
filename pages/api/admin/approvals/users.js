import db from "../../../../firebase/init-admin";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const usersRef = db.collection("users");
      const profileRef = db.collection("profile");
      const usersSnapshot = await usersRef
        .where("formSubmitted", "==", true)
        .where("pendingApproval", "==", true)
        .get();
      if (usersSnapshot.empty) {
        console.log("No pending approval users found.");
        res.status(200).json({ status: true, profiles: [] });
        return;
      }
      const userIds = usersSnapshot.docs.map((doc) => doc.id);
      const profilesSnapshot = await profileRef
        .where("uid", "in", userIds)
        .get();
      const pendingProfiles = profilesSnapshot.docs.map((doc) => doc.data());
      res.status(200).json({ status: true, profiles: pendingProfiles });
      // console.log(res);
    }
  } catch (err) {
    res.status(500).json({ status: false, message: err });
    console.log(err);
  }
}
