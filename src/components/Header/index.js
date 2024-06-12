import {AiFillHome} from 'react-icons/ai'
import {MdMail} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/" className="link-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="website-logo"
          alt="website logo"
        />
      </Link>
      <ul className="header-section-list-lg">
        <Link to="/" className="link-item">
          <li className="list-item">Home</li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li className="list-item">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="logout-button" onClick={onLogoutButton}>
        Logout
      </button>
      <li className="header-section-list-sm">
        <li className="list-item-sm">
          <Link to="/">
            <AiFillHome className="icon" />
          </Link>
        </li>

        <li className="list-item-sm">
          <Link to="/jobs">
            <MdMail className="icon" />
          </Link>
        </li>
        <li className="list-item-sm">
          <FiLogOut className="icon" onClick={onLogoutButton} />
        </li>
      </li>
    </div>
  )
}

export default withRouter(Header)
