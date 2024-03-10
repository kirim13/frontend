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
  const [user, setUser] = useState<User[] | null>(null);
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

  const handleSendFriendRequest = (
    id: string,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    let relationship = {
      userId: `clte5s2lp0000st8dcrhqf8jt`,
      friendId: `${id}`,
      status: "PENDING",
      updatedAt: new Date().toISOString(),
    };
    let relationshipData = JSON.stringify(relationship);
    e.preventDefault();
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
    });
  };

  const handleAcceptFriendRequest = (
    id: string,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    let relationship = {
      userId: `clte5s2lp0000st8dcrhqf8jt`,
      friendId: `${id}`,
      status: "CONFIRMED",
      updatedAt: new Date().toISOString(),
    };
    fetch("http://localhost:3001/relationships/", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(relationship),
    }).then(async (res) => {
      if (!res.ok) {
        const error = res.statusText;
        return Promise.reject(error);
      }
      console.log(await res.json());
    });
  };

  const handleDeleteFriend = (id: string, e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let relationship = {
      userId: `clte5s2lp0000st8dcrhqf8jt`,
      friendId: `${id}`,
    };
    fetch("http://localhost:3001/relationships/", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(relationship),
    }).then(async (res) => {
      if (!res.ok) {
        const error = res.statusText;
        return Promise.reject(error);
      }
      console.log(await res.json());
    });
  };

  useEffect(() => {
    try {
      fetch(`http://localhost:3001/users/clte5s2lp0000st8dcrhqf8jt`, {
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
          <div className="flex flex-col gap-4 border px-10 py-6">
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
                            handleSendFriendRequest(user.id, e)
                        }
                      >
                        Send Request
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              {currentUser &&
                currentUser.userFriends?.map((relation: any, index: number) => (
                  <div key={index}>
                    <div className="flex flex-col h-1/2 border gap-4">
                      Sent Requests:
                      <div className="flex flex-row gap-4 w-full">
                        {relation.status === "PENDING" && (
                          <>
                            <div className="flex justify-start w-1/2">
                              {relation.friendId}
                            </div>
                            <div className="flex justify-end w-1/2">
                              <button
                                className="border px-2"
                                onClick={(e) =>
                                  handleAcceptFriendRequest(
                                    relation.friendId,
                                    e
                                  )
                                }
                              >
                                Accept Request
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col border gap-4">
                      Current Accepted Friends:
                      <div className="flex flex-row gap-4">
                        {relation.status === "CONFIRMED" && (
                          <>
                            <div className="flex justify-start w-1/2">
                              {relation.friendId}
                            </div>
                            <div className="flex justify-end w-1/2 gap-2">
                              <button className="border px-2">Message</button>
                              <button
                                className="border px-2"
                                onClick={(e) =>
                                  handleDeleteFriend(relation.friendId, e)
                                }
                              >
                                X
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AddFriend;
