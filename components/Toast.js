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
            minHeight: "2.5rem",
            minHeight: "1.2rem",
          }}
        >
          <div
            className={`toast show bg-${color} text-light `}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              minWidth: "280px",
            }}
          >
            <div className={`toast-header bg-${color} text-light`}>
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