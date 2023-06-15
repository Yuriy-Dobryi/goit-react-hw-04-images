import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from './Modal.module.css';

export function Modal({ largeImg, tags, closeModal }) {
  const closeModalRef = useRef(closeModal);

  useEffect(() => {
    const onEscapeClick = ({ key }) => {
      if (key === "Escape") {
        closeModalRef.current();
      }
    };
    window.addEventListener('keydown', onEscapeClick);

    return () => window.removeEventListener('keydown', onEscapeClick);
  }, []);

  function onOverlayClick(e) {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      closeModalRef.current();
    }
  }

  return (
    <div onClick={onOverlayClick} className={styles.overlay}>
      <div className={styles.modal}>
        <img src={largeImg} alt={tags} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
