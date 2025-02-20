import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dkt3zutob/image/upload/v1739606551/covid19_dashboard_images/ej0epjdo3wf8rpstn07z.png"
      alt="not-found-pic"
      className="not-found-image"
    />
    <h1 className="not-found-heading">PAGE NOT FOUND</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found
    </p>
    <Link to="/">
      <button type="button" className="not-found-button">
        Home
      </button>
    </Link>
  </div>
)

export default NotFound
