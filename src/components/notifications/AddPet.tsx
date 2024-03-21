import { useEffect, useState } from "react";
import Modal from "../shared/modal";
import { AddPetProps, PetModalData } from "@/types/pets";
import { initialPetModalData } from "@/constants";

const AddPet: React.FC<AddPetProps> = ({ userId }) => {
  const [isNotificationModalOpen, setNotificationModalOpen] =
    useState<boolean>(false);
  const [pet, setPet] = useState<PetModalData>(initialPetModalData);

  useEffect(() => {
    setPet((prevPet) => ({
      ...prevPet,
      primaryOwnerId: userId,
    }));
  }, [userId]);

  const handleModalOpen = () => {
    setNotificationModalOpen(true);
  };

  const handleModalClose = () => {
    setNotificationModalOpen(false);
  };

  const handleFormSubmit = async () => {
    if (userId) {
      fetch("http://localhost:3001/pets/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pet),
      })
        .then(async (res) => {
          if (res.ok) {
            console.log(await res.json());
          } else
            throw new Error(
              `Error response with pet: ${pet.firstName} ${pet.lastName}. Status: ${res.status} ${res.statusText}`
            );
        })
        .catch((err) => {
          console.log(
            `Error request with pet: ${pet.firstName} ${pet.lastName}. Error: ${err.message}`
          );
        });
    }
  };

  const handleSubmitClick = (e: any) => {
    e.preventDefault();
    handleFormSubmit();
    handleModalClose();
  };

  return (
    <div>
      <button className="border py-2 px-4" onClick={handleModalOpen}>
        Add Pet
      </button>
      <Modal isOpen={isNotificationModalOpen} onClose={handleModalClose}>
        <form className="flex flex-col w-full" onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-4 p-4">
            <h1>What Is Your Pet&apos;s?</h1>
            <section className="flex flex-row gap-4">
              <div className="flex flex-1 gap-2">
                <label htmlFor="petFirstName">First Name: </label>
                <input
                  className="border"
                  onChange={(e) => {
                    setPet({ ...pet, firstName: e.target.value });
                  }}
                ></input>
              </div>
              <div className="flex flex-1 gap-2">
                <label htmlFor="petLastName">Last Name: </label>
                <input
                  className="border"
                  onChange={(e) => {
                    setPet({ ...pet, lastName: e.target.value });
                  }}
                ></input>
              </div>
            </section>

            <section className="flex flex-row gap-4">
              <div className="flex flex-1 gap-2">
                <label htmlFor="petType">Type: </label>
                <input
                  className="border"
                  onChange={(e) => {
                    setPet({ ...pet, type: e.target.value });
                  }}
                ></input>
              </div>
              <div className="flex flex-1 gap-2">
                <label htmlFor="petBreed">Breed: </label>
                <input
                  className="border"
                  onChange={(e) => {
                    setPet({ ...pet, breed: e.target.value });
                  }}
                ></input>
              </div>
            </section>

            <section className="flex flex-row gap-4">
              <div className="flex flex-1 gap-2">
                <label htmlFor="petBirthday">Birthday: </label>
                <input
                  className="border"
                  onChange={(e) => {
                    setPet({ ...pet, birthday: e.target.value });
                  }}
                ></input>
              </div>
              <div className="flex flex-1 gap-2">
                <label htmlFor="petGotchaDate">Gotcha Date: </label>
                <input
                  className="border"
                  onChange={(e) => {
                    setPet({ ...pet, gotchaDate: e.target.value });
                  }}
                ></input>
              </div>
            </section>
          </div>
          <div className="flex justify-end w-full">
            <button
              type="submit"
              className="px-4 py-2 border"
              onClick={handleSubmitClick}
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddPet;
