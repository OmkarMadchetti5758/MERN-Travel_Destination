// import './NewPlace.css'
import { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "@mui/material/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

export default function NewPlace() {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  async function placeSubmitHandler(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("address", formState.inputs.address.value);
    formData.append("creator", auth.userId);
    formData.append("image", formState.inputs.image.value);
    try {
      await sendRequest("http://localhost:5000/api/places", "POST", formData);
      history.push("/");
    } catch (err) {}
  }
  var disable;
  if (!formState.isValid) {
    disable = true;
  } else {
    disable = false;
  }
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <form
        className="list-none m-4 p-4 mt-32 text-center w-11/12 max-w-2xl shadow-xl rounded-md bg-slate-300 lg:ml-[22rem]"
        onSubmit={placeSubmitHandler}
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <h2 className="p-4 font-bold text-xl text-cyan-950 mb-2">
          Add New Place
        </h2>
        <hr className="border-cyan-950 lg:border-cyan-950 ml-4 mr-4 mb-4" />
        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          placeholder="Enter Title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please enter valid title"
        />
        <Input
          id="description"
          label="Description"
          element="textarea"
          placeholder="Enter Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          errorText="Please enter valid Description"
        />
        <Input
          id="address"
          label="Address"
          element="input"
          placeholder="Enter Address"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          errorText="Please enter valid Address"
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Button
          variant="contained"
          size="medium"
          color="success"
          type="submit"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
          disabled={disable}
        >
          ADD PLACE
        </Button>
      </form>
    </>
  );
}
