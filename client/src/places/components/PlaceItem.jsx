import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import Button from "@mui/material/Button";
import Card from "../../shared/components/UIElements/Card";
import Modal from "../../shared/components/UIElements/Modal";
// import "./PlaceItem.css";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

export default function PlaceItem(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  function openShowMap() {
    setShowMap(true);
  }

  function closeShowMap() {
    setShowMap(false);
  }

  function showDeleteWarningHandler() {
    setShowConfirmModal(true);
  }

  function cancelDeleteHandler() {
    setShowConfirmModal(false);
  }

  async function confirmDeleteHandler() {
    console.log("DELETED");
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/apiplaces/${props.id}`,
        "DELETE"
      );
      props.onDelete(props.id);
    } catch (err) {}
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeShowMap}
        header={props.address}
        contentClass="p-0"
        footerClass="text-right"
        footer={
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={closeShowMap}
          >
            CLOSE
          </Button>
        }
      >
        <div className="h-60w-full">
          <h2>The MAP</h2>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="text-right"
        footer={
          <div className="p-4 text-center flex justify-end space-x-2">
            <Button
              variant="outlined"
              size="small"
              color="info"
              onClick={cancelDeleteHandler}
            >
              CANCEL
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={confirmDeleteHandler}
            >
              DELETE
            </Button>
          </div>
        }
      >
        <p>
          Do you want to proceed and delete place{" "}
          <span className="text-red-600 font-semibold">{props.title}</span> ?
        </p>
      </Modal>
      <li className="m-4 overflow-hidden">
        <Card className="p-0">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="w-full h-48 mr-6 md:h-80">
            <img
              src={`http://localhost:5000/${props.image}`}
              alt={props.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="p-4 text-center text-white">
            <h2 className="m-2 font-extrabold font-sans text-green-500">
              {props.title}
            </h2>
            <h3 className="m-2 font-bold text-green-300">{props.address}</h3>
            <p className="m-2 text-green-200">{props.description}</p>
          </div>
          <div className="p-4 text-center flex justify-center space-x-2">
            <Button
              variant="outlined"
              size="small"
              color="warning"
              onClick={openShowMap}
            >
              VIEW MAP
            </Button>
            {auth.userId === props.creatorId && (
              <Button variant="contained" size="small" color="warning">
                <Link to={`/places/${props.id}`}>Edit</Link>
              </Button>
            )}
            {/* {auth.userId === props.creatorId && (
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={showDeleteWarningHandler}
              >
                DELETE
              </Button>
            )} */}
            {/* <button className={buttonStyle}></button> */}
          </div>
        </Card>
      </li>
    </>
  );
}
