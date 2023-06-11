import { useState } from "react";
import { toast } from 'react-toastify';
import PropTypes from "prop-types";
import styles from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');
  
  const saveInput = (e) => {
    const { value } = e.target;
    setSearch(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedSearch = search.trim();

    if (trimmedSearch === '') {
      toast.warning('There should not be an empty line.')
      return;
    }
    
    onSubmit(trimmedSearch);
  }
    
  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.btn}>
          <span className={styles.label}>Search</span>
        </button>

        <input
          className={styles.input}
          name="search"
          type="text"
          value={search}
          onChange={saveInput}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};