import { useState } from "react";
import Button from "../shared/Button";
import Modal from "../shared/modal";

function AddFriend() {
  const [isNotificationModalOpen, setNotificationModalOpen] =
    useState<boolean>(false);
  const handleFriendModalOpen = () => {
    setNotificationModalOpen(true);
  };

  const handleFriendModalClose = () => {
    setNotificationModalOpen(false);
  };

  return (
    <div className="p-2 b border">
      <Button>
        <button onClick={handleFriendModalOpen} className="border p-2">
          Add Friend
        </button>
      </Button>
      <Modal isOpen={isNotificationModalOpen} onClose={handleFriendModalClose}>
        <form id="add-friend-form" className="add-friend-form">
          <div>Search Bar</div>
          <div>Friends</div>
          <div>Send Friend Request</div>
          <div>Message Friend</div>
          <div>Remove Friend</div>
        </form>
      </Modal>
    </div>
  );
}

export default AddFriend;
