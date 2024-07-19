import { useReducer, useEffect } from "react";
import { validate } from "../../util/validators";

import "./Input.css";

function inputReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
}

export default function Input(props) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  function changeHandler(event) {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  }

  function touchHandler() {
    dispatch({
      type: "TOUCH",
    });
  }

  const element =
    props.element === "input" ? (
      <>
        {/* <label htmlFor={props.id} className="block mb-2 mr-[38rem] font-bold">
          {props.label}
        </label> */}
        <input
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
          className="block w-full rounded-md border border-slate-400 bg-slate-200 p-1 focus:outline-none focus:bg-slate-100 focus:border-slate-200"
        />
      </>
    ) : (
      <>
        {/* <label htmlFor={props.id} className="block mb-2 mr-[38rem] font-bold">
          {props.label}
        </label> */}
        <textarea
          id={props.id}
          rows={props.row || 3}
          className="block w-full rounded-md border border-slate-400 bg-slate-200 p-1 focus:outline-none focus:bg-slate-100 focus:border-slate-200"
          placeholder={props.placeholder}
          onChange={changeHandler}
          onBlur={touchHandler}
          value={inputState.value}
        />
      </>
    );
  return (
    <div
      className={`m-2 ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label
        htmlFor={props.id}
        className="block mb-2 mr-[38rem] font-bold text-cyan-800"
      >
        {props.label}
      </label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}
