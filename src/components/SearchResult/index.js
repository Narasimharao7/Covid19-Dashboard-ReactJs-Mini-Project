import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SearchResults = props => {
  const {stateDetails} = props
  const stateName = stateDetails.state_name
  const stateCode = stateDetails.state_code

  return (
    <>
      <Link to={`state/${stateCode}`} className="search-state-link">
        <li>
          <div className="search-list-items">
            <p className="search-state-name">{stateName}</p>
            <button type="button" className="search-state-code-button">
              <p className="search-state-code">{stateCode}</p>
              <BiChevronRightSquare className="search-state-code-icon" />
            </button>
          </div>
          <hr className="horizontal-line" />
        </li>
      </Link>
    </>
  )
}

export default SearchResults
