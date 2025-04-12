import { BsAlarmFill } from "react-icons/bs";

interface AlertProps {
  children: string; // if you want to pass only string as children, e.g. "This is a alert"
  hidden?: boolean; // if you want to hide the alert, e.g. hidden={true}
  // children: ReactNode; // if you want to pass any type of children, e.g. span, div, etc.
  onClose?: () => void; // if you want to handle close event, e.g. onClose={() => console.log("Alert closed")}
}

// Alert component
// This component is a simple alert box that displays a message passed as children.
function Alert({ children, hidden, onClose }: AlertProps) {
  return (
    <div className="alert alert-warning shadow-lg" hidden={hidden}>
      <BsAlarmFill className="mx-2" />
      {children}
      <button
        type="button"
        className="btn-close ms-2"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={onClose} // Call the onClose function when the close button is clicked
      ></button>
    </div>
  );
}

export default Alert;
