import React, { useState, useContext } from "react";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "@mui/material/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/auth-context";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

export default function Auth() {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  function switchModeHandler() {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
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
    }
    setIsLoginMode((prev) => !prev);
  }

  async function authSubmitHandler(event) {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.user.id);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("email", formState.inputs.email.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          formData
        );
        auth.login(responseData.user.id);
      } catch (err) {}
    }
  }

  //className="bg-slate-300 lg:w-[40rem] lg:h-[22rem] md:w-[40rem] text-center mt-40 lg:ml-[23rem]"
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="bg-stone-200 text-center lg:w-[40rem] lg:mt-[2rem] md:w-[40rem]">
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="relative lg:mr-[-45rem]">
          <h2 className="p-4 font-bold text-xl text-cyan-950 mb-2">
            {isLoginMode ? "Login" : "SignUp"} Required
          </h2>
          {/* <hr className="border-cyan-950 lg:border-cyan-950 ml-[25rem] mr-[24rem] mb-4" /> */}
        </div>
        <form
          onSubmit={authSubmitHandler}
          className="list-none m-4 p-4 mb-8 pb-8 text-center w-11/12 shadow-xl rounded-md bg-slate-300 lg:ml-[24.5rem]"
        >
          {isLoading && <LoadingSpinner asOverlay />}
          {!isLoginMode && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Name"
              placeholder="Enter your name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name"
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && <ImageUpload id="image" onInput={inputHandler} errorText="Please provide an image." />}
          <Input
            element="input"
            id="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password"
            onInput={inputHandler}
          />
          <div className="flex justify-center gap-4">
            <Button
              variant="contained"
              size="medium"
              color="success"
              type="submit"
              style={{ marginTop: "1rem" }}
              disabled={!formState.isValid}
            >
              {isLoginMode ? "LOGIN" : "SIGNUP"}
            </Button>
            <Button
              variant="contained"
              size="medium"
              type="submit"
              style={{
                marginTop: "1rem",
                width: "11rem",
                backgroundColor: "rgb(8 51 68)",
                // color: "#FFBF00",
                textAlign: "center",
              }}
              onClick={switchModeHandler}
            >
              Switch to {isLoginMode ? "SIGNUP" : "LOGIN"}
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}
