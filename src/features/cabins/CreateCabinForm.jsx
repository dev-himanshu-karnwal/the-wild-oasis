import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isEditing || isCreating;

  const {
    register,
    handleSubmit,
    reset: resetForm,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession
      ? {
          ...editValues,
          discount: editValues.discount ? editValues.discount : 0,
        }
      : {},
  });

  function onSubmit(data) {
    console.log(data);
    let image = typeof data.image === "string" ? data.image : data.image?.[0];

    if (isEditSession) {
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            resetForm();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            resetForm();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    errors;
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This is a required field" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          min={0}
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This is a required field",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          min={0}
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This is a required field",
            min: {
              value: 1,
              message: "Regular Price should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          min={0}
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This is a required field",
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "Discount must be less than regular Price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", { required: "This is a required field" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "This is a required field",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
