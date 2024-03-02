import { MouseEvent, useEffect, useState } from "react";
import Button from "../shared/Button";
import Modal from "../shared/modal";
import { User } from "@/types/relationships";

function AddFriend() {
  const [isNotificationModalOpen, setNotificationModalOpen] =
    useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState("");
  const [tempUsername, setTempUsername] = useState("");
  const [user, setUser] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleFriendModalOpen = () => {
    setNotificationModalOpen(true);
  };
  const handleFriendModalClose = () => {
    setNotificationModalOpen(false);
  };

  const handleUsername = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUsername(tempUsername);
  };

  const handleFriendRequest = (
    id: string,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    let relationship = {
      fromUserId: `clt9gy1zx0000tcmzs7g5q4vo`,
      toUserId: `${id}`,
    };
    let relationshipData = JSON.stringify(relationship);
    e.preventDefault();
    try {
      fetch("http://localhost:3001/relationships", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: relationshipData,
      }).then(async (res) => {
        if (!res.ok) {
          const error = res.statusText;
          return Promise.reject(error);
        }
        console.log(await res.json());
        console.log(`Successfully sent friend request`);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      fetch(`http://localhost:3001/users/clt9gy1zx0000tcmzs7g5q4vo`, {
        method: "GET",
      }).then(async (res) => {
        const userData = await res.json();
        if (!res.ok) {
          const error = res.statusText;
          return Promise.reject(error);
        }
        if (userData) {
          await setCurrentUser(userData);
          console.log(`Currently logged in: ${userData.username}`);
          console.log(userData[0].fromUserRelationships);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    try {
      fetch(`http://localhost:3001/users/`, {
        method: "GET",
      }).then(async (res) => {
        const userData: User[] = await res.json();
        if (!res.ok) {
          const error = res.statusText;
          return Promise.reject(error);
        }
        setUsers(userData);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    try {
      fetch(`http://localhost:3001/users/username/${username}`, {
        method: "GET",
      }).then(async (res) => {
        const userData: User[] = await res.json();
        if (!res.ok) {
          const error = res.statusText;
          console.log(`Could not find user ${username}`);
          return Promise.reject(error);
        }
        setUser(userData);
        console.log(`Found user ${username}`);
      });
    } catch (err) {
      console.error(err);
    }
  }, [username]);

  return (
    <div className="p-2 b border">
      <Button>
        <button onClick={handleFriendModalOpen} className="border p-2">
          Add Friend
        </button>
      </Button>
      <Modal isOpen={isNotificationModalOpen} onClose={handleFriendModalClose}>
        <form id="add-friend-form" className="add-friend-form">
          <div className="flex flex-col gap-4 border px-10 py-2">
            <div className="border p-2">
              <div className="flex flex-col">
                <div>Current User:</div>
                <div>
                  {currentUser ? currentUser.username : "No Current User"}
                </div>
              </div>
            </div>

            <div className="border p-2">
              <div className="flex flex-col">
                <div>Registered Users:</div>
                {users.map((user, index) => (
                  <div key={index}>{user.username}</div>
                ))}
              </div>
            </div>

            <div className="border p-2">
              <div className="flex flex-col">
                <label htmlFor="search-bar">Search Bar</label>
                <div className="flex flex-row gap-4">
                  <input
                    type="text"
                    id="search-bar"
                    name="search-bar"
                    className="border"
                    onChange={(e) => setTempUsername(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleUsername}
                    className="border px-2"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="border p-2">
              {user && (
                <div className="flex flex-col">
                  <div>Found User</div>
                  <div className="flex flex-row gap-4 w-full">
                    {/* @ts-ignore: Unreachable code error */}
                    <div className="flex justify-start w-1/2">{`${user.firstName} ${user.lastName}`}</div>
                    <div className="flex justify-end w-1/2">
                      <button
                        className="border px-2"
                        onClick={
                          /* @ts-ignore: Unreachable code error */ (e) =>
                            handleFriendRequest(user.id, e)
                        }
                      >
                        Send Request
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border p-2">
              <div className="flex flex-col gap-2">
                <div>Current Requests:</div>
                {currentUser &&
                  currentUser.fromUserRelationships &&
                  currentUser.fromUserRelationships.map((relation, index) => (
                    <div key={index} className="flex flex-row w-full gap-4">
                      <div className="flex justify-start w-1/2">
                        {relation.fromUserId}
                      </div>
                      <div className="flex justify-end w-1/2">
                        <button className="border px-2">Accept Request</button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="border p-2">
              <div>Current Friends</div>
              <div className="flex flex-row gap-4 w-full">
                <div className="flex justify-start w-1/2">Name</div>
                <div className="flex justify-end gap-4 w-1/2">
                  <button className="border px-2">Message</button>
                  <button className="border px-2">Remove Friend</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AddFriend;
