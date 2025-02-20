import {BsSearch} from 'react-icons/bs'
import './index.css'

const SearchBar = props => {
  const {searchInput, onChangeSearchInput} = props
  const onChangeSearch = event => {
    onChangeSearchInput(event)
  }

  return (
    <div className="search-input-container">
      <BsSearch className="search-icon" />
      <input
        type="search"
        className="search-input"
        value={searchInput}
        onChange={onChangeSearch}
        placeholder="Enter the State"
      />
    </div>
  )
}

export default SearchBar
