import './index.css'

const PasswordItem = props => {
  const {userDetails, checked} = props
  const {id, website, username, password, initialClassName} = userDetails
  const initial = username ? username[0].toUpperCase() : ''

  const onDelete = () => {
    const {deleteUserDetails} = props
    deleteUserDetails(id)
  }

  return (
    <li className="userPasswordDetailsList_item">
      <div className="passwordDetails_container">
        <div className={`initialContainer ${initialClassName}`}>
          <p className="initial">{initial}</p>
        </div>
        <div className="userPassword_container">
          <p className="input_text">{website}</p>
          <p className="input_text">{username}</p>
          {!checked && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              className="stars_image"
              alt="stars"
            />
          )}
          {checked && <p className="show_password">{password}</p>}
        </div>
      </div>
      <button type="button" className="delete_button" onClick={onDelete}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="del_image"
        />
      </button>
    </li>
  )
}

export default PasswordItem
