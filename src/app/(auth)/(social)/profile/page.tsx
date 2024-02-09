import SocialTopBar from "../../../../components/social-page/Topbar";
import type { NextPage } from "next";

export const metadata = {
  title: "Profile Page",
  description: "",
};

const Profile: NextPage = () => {
  return (
    <div>
      <SocialTopBar />
      <main>
        <h1>Profile Page</h1>
        <div>Username</div>
        <div>Family of 3: Toast, Bob, and Steve</div>
        <div>My Friends</div>
        <div>My Posts</div>
        <div>Photos</div>
      </main>
    </div>
  );
};

export default Profile;
