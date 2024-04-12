import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";

function CabinOperationsContextMenu({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();
  const isLoading = isDeleting || isCreating;

  function handleDuplicate() {
    createCabin({
      name: `${name}-copy`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle toggles={cabinId} disabled={isLoading} />

        <Menus.List id={cabinId}>
          <Modal.Open opens="edit-cabin">
            <Menus.Button disabled={isLoading} icon={<HiPencil />}>
              Edit
            </Menus.Button>
          </Modal.Open>

          <Menus.Button
            disabled={isLoading}
            icon={<HiSquare2Stack />}
            onClick={handleDuplicate}
          >
            Duplicate
          </Menus.Button>

          <Modal.Open opens="delete-cabin">
            <Menus.Button disabled={isLoading} icon={<HiTrash />}>
              Delete
            </Menus.Button>
          </Modal.Open>
        </Menus.List>

        <Modal.Window name="edit-cabin">
          <CreateCabinForm cabinToEdit={cabin} />
        </Modal.Window>

        <Modal.Window name="delete-cabin">
          <ConfirmDelete
            onConfirm={() => deleteCabin(cabinId)}
            disabled={isDeleting}
            resourceName="Cabin"
          />
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
}

export default CabinOperationsContextMenu;
