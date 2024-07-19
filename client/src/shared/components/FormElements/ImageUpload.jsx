import "./ImageUpload.css";
import Button from "@mui/material/Button";
import { useRef, useState, useEffect } from "react";

export default function ImageUpload(props) {
    const [file, setFile] = useState();
    const [previewUrl, setpreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

    useEffect(() => {
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setpreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    },[file])

    function pickedHandler(event){
        let pickedFile;
        let fileIsValid = isValid;
        if(event.target.files && event.target.files.length !== 0){
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true
        }else{
            setIsValid(false);
            fileIsValid = false
        }
        props.onInput(props.id, pickedFile, fileIsValid)
    }

    function pickImageHandler(){
        filePickerRef.current.click();
    }

  return (
    <div className="form-control">
      <input
        id={props.id}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        type="file"
        ref={filePickerRef}
        onChange={pickedHandler}
      />
      <div className="image-upload ">
        <div className="image-upload__preview lg:ml-[13.5rem] ml-[4.8rem]">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an Image.</p>}
        </div>
        <Button
          variant="contained"
          size="medium"
          color="success"
          type="button"
          //   style={{ marginTop: "1rem" }}
          style={{
            marginTop: "1rem",
            width: "11rem",
            backgroundColor: "rgb(8 51 68)",
            // color: "#FFBF00",
            textAlign: "center",
          }}
          onClick={pickImageHandler}
          //   disabled={!formState.isValid}
        >
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
}
