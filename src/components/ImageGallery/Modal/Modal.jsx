import { useEffect } from "react";
import PropTypes from "prop-types";
import styles from './Modal.module.css';

export function Modal({ largeImg, tags, closeModal }) {

  useEffect(() => {
    const onEscapeClick = ({ key }) => {
      if (key === "Escape") {
        closeModal();
      }
    }
    window.addEventListener('keydown', onEscapeClick);

    return () => window.removeEventListener('keydown', onEscapeClick);
  }, [closeModal]);

  function onOverlayClick(e) {
    e.preventDefault();
    if (e.target === e.currentTarget) {
      closeModal();
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