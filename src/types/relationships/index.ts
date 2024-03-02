export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  toUserRelationships?: [];
  fromUserRelationships?: { fromUserId: string }[];
};
