import LeftSidebar from "@/components/shared/LeftSidebar";
import SocialTopBar from "@/components/social-page/Topbar";
import Post from "@/components/social-page/PicturePost";
import type { NextPage } from "next";
import AddPicturePost from "@/components/social-page/AddPicturePost";

export const metadata = {
  title: "VieVista",
  description: "",
};

const MyFeed: NextPage = () => {
  const postData = {
    user: {
      username: "John Smith",
      profileImageURL: "/assets/profile-example.png",
    },
    userPost: {
      postImageURL: "/photos/cat.jpg",
      createdAt: "1/2/2024",
      caption: "Toast",
    },
    publicInteractions: {
      textbox: "",
      comments: [],
      hearts: 0,
    },
  };
  return (
    <div>
      <SocialTopBar />

      <Post post={postData} />
      <AddPicturePost />
      <main>
        <section>New Notifications</section>
        <section>Earlier Today</section>
        <section>Earlier This Week</section>
        <section>Earlier This Month</section>
        <section>Older Notifications</section>
      </main>
    </div>
  );
};

export default MyFeed;
