export interface PicturePostProps {
  user: {
    username: string;
    profileImageURL: string;
  };
  userPost: {
    postImageURL?: string;
    createdAt: string;
    caption?: string;
  };
  publicInteractions: {
    textbox?: string;
    comments?: string[];
    hearts: number;
  };
}
