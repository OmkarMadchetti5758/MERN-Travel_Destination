import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

export default function UpdatePlace() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    async function fetchPlace() {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    }
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  async function placeUpdateSubmitHandler(event) {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        { "Content-Type": "application/json" }
      );
      history.push('/' + auth.userId + '/places');
    } catch (err) {}
  }

  if (isLoading) {
    return (
      <div className="lg:ml-[41rem] lg:mt-[20rem] ml-[12rem] mt-[10rem]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="text-center font-bold text-red-600 text-xl mt-[7rem]">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form
          className="list-none m-4 p-4 mt-32 text-center w-11/12 max-w-2xl shadow-xl rounded-md bg-slate-300 lg:ml-[22rem]"
          onSubmit={placeUpdateSubmitHandler}
        >
          <h2 className="p-4 font-bold text-xl text-cyan-950 mb-2">
            Update ({loadedPlace.title})
          </h2>
          <hr className="border-cyan-950 lg:border-cyan-950 ml-4 mr-4 mb-8" />
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter valid title"
            onInput={inputHandler}
            initialValue={loadedPlace.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter valid description"
            onInput={inputHandler}
            initialValue={loadedPlace.description}
            initialValid={true}
          />
          <Button
            variant="contained"
            size="medium"
            color="success"
            type="submit"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
            disabled={!formState.isValid}
          >
            UPDATE PLACE
          </Button>
        </form>
      )}
    </>
  );
}
