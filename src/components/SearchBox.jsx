import { useState } from 'react';
import css from '../components/main.module.css';
export const SearchBox = ({ onChangeQuery }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const onChange = e => {
    setSearchQuery(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    onChangeQuery(searchQuery);
    setSearchQuery('');
  };

  return (
    <form className={css.searchBox} onSubmit={onSubmit}>
      <input
        className={css.input}
        type="text"
        autoComplete="off"
        value={searchQuery}
        autoFocus
        placeholder="Search images and photos"
        onChange={onChange}
      />
      <button className={css.searchButton} type="submit">
        Search
      </button>
    </form>
  );
};
