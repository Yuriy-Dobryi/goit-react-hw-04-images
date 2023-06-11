import PropTypes from "prop-types";
import { ImageGalleryItem } from './ImageGalleryItem';
import styles from './ImageGallery.module.css';

export const ImageGallery = ({ images }) => (
  <ul className={styles.gallery}>
    {images.map(({id, webformatURL , largeImageURL, tags }) =>
      <ImageGalleryItem key={id}
        previewImg={webformatURL}
        largeImg={largeImageURL}
        tags={tags} />)}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    })
  ).isRequired,
};