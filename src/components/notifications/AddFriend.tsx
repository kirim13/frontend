import { MouseEvent, useEffect, useState } from "react";
import Button from "../shared/Button";
import Modal from "../shared/modal";
import { User } from "@/types/relationships";

function AddFriend() {
  const [isNotificationModalOpen, setNotificationModalOpen] =
    useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [searchUser, setSearchUser] = useState("");
  const [foundUser, setFoundUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleFriendModalOpen = () => {
    setNotificationModalOpen(true);
  };
  const handleFriendModalClose = () => {
    setNotificationModalOpen(false);
  };

  const handleSendFriendRequest = (
    friendId: string,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    fetch("http://localhost:3001/relationships", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: `${currentUser?.id}`,
        friendId: `${friendId}`,
        status: "PENDING",
        updatedAt: new Date().toISOString(),
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        console.log(await res.json());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAcceptFriendRequest = (
    id: string,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    console.log(id, currentUser?.id);
    fetch("http://localhost:3001/relationships/", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: `${currentUser?.id}`,
        friendId: `${id}`,
        status: "CONFIRMED",
        updatedAt: new Date().toISOString(),
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        console.log(await res.json());
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteFriend = (id: string, e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(currentUser?.id);
    console.log(id);
    fetch("http://localhost:3001/relationships/", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: `${currentUser?.id}`,
        friendId: `${id}`,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        console.log(await res.json());
      })
      .catch((err) => {
        console.error(err);
      });
  };

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

  const handleSearchUser = () => {
    const username = searchUser;
    fetch(`http://localhost:3001/users/username/${username}`, {
      method: "GET",
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`${res.statusText}`);
        }
        const userData = await res.json();
        if (userData.username === currentUser?.username) {
          throw new Error(`${userData.username} is logged in`);
        }
        setFoundUser(userData);
        console.log(`Found user ${username}`);
      })
      .catch((err) => {
        setFoundUser(null);
        console.error(err);
      });
  };

  return (
    <div>
      <button onClick={handleFriendModalOpen} className="border p-2">
        Add Friend
      </button>

      <Modal isOpen={isNotificationModalOpen} onClose={handleFriendModalClose}>
        <form id="add-friend-form" className="add-friend-form">
          <div className="flex flex-col border gap-4 p-3">
            <div>Registered Users:</div>
            <div className="flex flex-col gap-1">
              {users.map((user, index) => (
                <div key={index}>{`${user.username} ${user.id}`}</div>
              ))}
            </div>
          </div>

          <div className="flex flex-col border gap-4 p-3">
            <label htmlFor="search-bar">Search Bar</label>
            <div className="flex flex-row gap-4 w-full">
              <input
                type="text"
                id="search-bar"
                name="search-bar"
                className="border w-3/4"
                onChange={(e) => setSearchUser(e.target.value)}
              />
              <button
                type="button"
                onClick={handleSearchUser}
                className="border px-2 w-1/4"
              >
                Search
              </button>
            </div>
          </div>

          <div className="flex flex-col border gap-4 p-3">
            <div>Found User</div>
            {foundUser != null &&
              foundUser.username != currentUser?.username && (
                <div className="flex flex-row gap-4 w-full">
                  <div className="flex justify-start w-1/2">{`${foundUser.firstName} ${foundUser.lastName}`}</div>
                  <div className="flex justify-end w-1/2">
                    <button
                      className="border px-2"
                      onClick={(e) => handleSendFriendRequest(foundUser.id, e)}
                    >
                      Send Request
                    </button>
                  </div>
                </div>
              )}
          </div>

          <div className="flex flex-col h-1/2 border gap-4 p-3">
            <div>Sent Requests</div>
            {currentUser &&
              currentUser.friendUserFriends?.map(
                (relation: any, index: number) => (
                  <div key={index}>
                    <div className="flex flex-row gap-4 w-full">
                      {relation.status === "PENDING" && (
                        <>
                          <div className="flex justify-start w-1/2">
                            {relation.userId}
                          </div>
                          <div className="flex justify-end w-1/2">
                            <button
                              className="border px-2"
                              onClick={(e) =>
                                handleAcceptFriendRequest(relation.userId, e)
                              }
                            >
                              Accept Request
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              )}
          </div>

          <div className="flex flex-col h-1/2 border gap-4 p-3">
            <div>Friends</div>
            {currentUser &&
              currentUser.friendUserFriends?.map(
                (relation: any, index: number) => (
                  <div key={index}>
                    <div className="flex flex-row gap-4">
                      {relation.status === "CONFIRMED" && (
                        <>
                          <div className="flex justify-start w-1/2">
                            {relation.userId}
                          </div>
                          <div className="flex justify-end w-1/2 gap-2">
                            <button className="border px-2">Message</button>
                            <button
                              className="border px-2"
                              onClick={(e) =>
                                handleDeleteFriend(relation.userId, e)
                              }
                            >
                              X
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              )}
            {currentUser &&
              currentUser.userFriends?.map((relation: any, index: number) => (
                <div key={index}>
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
              ))}
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AddFriend;
