import { useState, FormEvent } from 'react';
import css from './SearchBar.module.css';
import toast from 'react-hot-toast';

interface SearchBarProps {
  handleSetQuery: (newQuery: string) => void;
}



const SearchBar: React.FC<SearchBarProps> = ({ handleSetQuery }) => {
  const [value, setValue] = useState<string>('');
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    if (value.trim() === '') {
      toast(`
text must be entered to search for images`);
    }
    e.preventDefault();
    handleSetQuery(value);
  };
  return (
    <header>
      <form onSubmit={handleSubmit} className={css.forma}>
        <input
          name="search"
          onChange={e => {
            setValue(e.target.value);
          }}
          value={value}
          className={css.inpuT}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
