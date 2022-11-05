import { useState } from 'react';
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
    <form onSubmit={onSubmit}>
      <button type="submit">Search</button>

      <input
        type="text"
        autoComplete="off"
        value={searchQuery}
        autoFocus
        placeholder="Search images and photos"
        onChange={onChange}
      />
    </form>
  );
};
