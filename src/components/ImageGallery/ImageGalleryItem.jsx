import { useState } from "react";
import { Modal } from './Modal/Modal';
import styles from './ImageGallery.module.css';

export function ImageGalleryItem ({previewImg, largeImg, tags}) {
  const [isModalShow, setIsModalShow] = useState(false);

  const toggleModal = () => {
    setIsModalShow(!isModalShow);
  }

    return (
      <li className={styles.item}>
        <img className={styles.image}
          onClick={toggleModal}
          src={previewImg}
          loading={"lazy"}
          alt={tags} />
        
        {isModalShow &&
          <Modal
            closeModal={toggleModal}
            largeImg={largeImg}
            tags={tags} />}
      </li>
    );
}