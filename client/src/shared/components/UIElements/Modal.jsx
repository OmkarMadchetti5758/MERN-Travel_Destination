import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";
import "./Modal.css";
function ModalOverlay(props) {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`w-full p-8 bg-cyan-950 text-amber-500 font-bold text-center text-xl ${props.headerClass}`}>
        <h2 className="m-2">{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`p-4 h-full ${props.contentClass}`}>
            {props.children}
        </div>
        <footer className={`p-4 ${props.footerClass}`}>
            {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
}

export default function Modal(props) {
    return(
        <>
        {props.show && <Backdrop onClick={props.onCancel} />}
        <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={300} classNames="modal">
            <ModalOverlay {...props} />
        </CSSTransition>
        </>
    )
}
