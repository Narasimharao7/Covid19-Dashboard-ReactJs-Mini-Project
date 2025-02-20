import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <div className="footer-element">
      <p className="footer-heading">
        COVID19<span className="footer-india-text">INDIA</span>
      </p>
    </div>
    <div className="footer-element">
      <p className="footer-description">
        we stand with everyone fighting on the front lines
      </p>
    </div>
    <div className="footer-icons-container">
      <a
        href="https://github.com/"
        target="_blank"
        rel="noreferrer"
        label="Github"
      >
        <VscGithubAlt className="footer-icons" />
      </a>
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noreferrer"
        label="Instagram"
      >
        <FiInstagram className="footer-icons" />
      </a>
      <a
        href="https://x.com/"
        target="_blank"
        rel="noreferrer"
        label="XTwitter"
      >
        <FaTwitter className="footer-icons" />
      </a>
    </div>
  </footer>
)

export default Footer
