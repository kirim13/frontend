import { PicturePostProps } from "@/types/social-page";

const PicturePost: React.FC<{ post: PicturePostProps }> = ({ post }) => {
  return (
    <div className="post_user">
      <div className="flex flex-row">
        <div>{post.user.username}</div>
        <div>{post.user.profileImageURL}</div>
      </div>
      <div className="post">
        <div>{post.userPost.postImageURL}</div>
        <div>{post.userPost.createdAt}</div>
        <div>{post.userPost.caption}</div>
      </div>
      <div className="post_interactions">
        <div>{post.publicInteractions.textbox}</div>
        <div>{post.publicInteractions.comments}</div>
        <div>{post.publicInteractions.hearts}</div>
      </div>
    </div>
  );
};

export default PicturePost;
