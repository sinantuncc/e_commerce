import { useDispatch, useSelector } from "react-redux";
import { notifyReset } from "../store/actions/notify";

const Toast = () => {
  const dispatch = useDispatch();
  const { message, color } = useSelector((state) => state.notify);

  const handleDismiss = () => {
    dispatch(notifyReset());
  };

  return (
    <>
      {message ? (
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className={`toast  show ${color}`}
            style={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              minWidth: "200px",
            }}
          >
            <div className={`toast-header ${color}`}>
              <div className="mr-auto">{message}</div>
              <button
                type="button"
                className="ml-2 mb-1 close"
                data-dismiss="toast"
                aria-label="Close"
                onClick={handleDismiss}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Toast;
