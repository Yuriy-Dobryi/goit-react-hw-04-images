import PropTypes from "prop-types";
import styles from './LoadMoreBtn.module.css'

export const LoadMoreBtn = ({ handleClick }) => (
  <button className={styles["load-more"]}
    onClick={handleClick}>
    Load more
  </button>
);

LoadMoreBtn.propTypes = {
  handleClick: PropTypes.func.isRequired,
};