import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Search = ({ setShowSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
  

    navigate(`/shop?search=${searchInput}`);
  };

  // Update the search term when the user types
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);

  };

  return (
    <div className="searchBar border-t border-b bg-gray-50 flex justify-center gap-3 items-center">
      <div className='w-3/4 sm:w-1/2 relative'>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder='Search'
            className='w-full outline-none bg-inherit text-sm text-start border border-gray-400 px-5 py-2 my-5 rounded-full '
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <button className='absolute top-1/2 -translate-y-1/2 right-3'>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='w-4 text-lg' />
          </button>
        </form>

      </div>
      {/* Cancel (x) icon to close the search bar */}
      <FontAwesomeIcon
        icon={faX}
        className='inline w-3 cursor-pointer ml-3 transition-all ease-in-out hover:rotate-180'
        onClick={() => {
          setSearchInput('');
          setShowSearch(false);
        }}
      />
    </div>
  );
}

export default Search;
