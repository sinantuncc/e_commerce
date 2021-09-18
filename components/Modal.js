import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../store/actions/cart";

const Modal = () => {
  const { data, message, operation } = useSelector((state) => state.modal);

  const dispatch = useDispatch();
  const handleClick = () => {
    if (operation === "deleteProduct") {
      dispatch(removeFromCart(data._id));

      $("#staticBackdrop").modal("hide");
    }
  };

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-backdrop="static"
      data-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5
              className="modal-title text-capitalize"
              id="staticBackdropLabel"
            >
              {data.title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
