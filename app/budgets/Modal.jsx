import { useEffect } from "react";
import ReactPortal from "../Components/ReactPortal";

export default function Modal({ children, isOpen, handleClose }) {
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <>
        <div className="modal-overlay" />
        <div className="modal-content">
          {children}
        </div>
      </>
    </ReactPortal>
  );
}
