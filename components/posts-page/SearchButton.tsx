import { Dispatch, SetStateAction } from 'react';
import CloseIcon from '../icons/close';
import SearchIcon from '../icons/search';

type SearchButtonProps = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
};

const SearchButton = ({ search, setSearch }: SearchButtonProps) => {
  if (search.length === 0) {
    return (
      <div className="search">
        <SearchIcon size={20} />
      </div>
    );
  } else {
    return (
      <button className="close" onClick={() => setSearch('')}>
        <CloseIcon size={25} />
      </button>
    );
  }
};

export default SearchButton;
