import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const initialContainerBgClassNames = [
  'red',
  'blue',
  'green',
  'violet',
  'indigo',
  'yellow',
  'cyan',
]

class PasswordManager extends Component {
  state = {
    userDetailsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    checked: false,
    searchInput: '',
  }

  onWebsite = event => {
    this.setState({
      websiteInput: event.target.value,
    })
  }

  onUsername = event => {
    this.setState({
      usernameInput: event.target.value,
    })
  }

  onPassword = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onAdd = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const initialBgColorClassNames = `initial_container ${
      initialContainerBgClassNames[
        Math.ceil(Math.random() * initialContainerBgClassNames.length - 1)
      ]
    }`
    const newUser = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      initialClassName: initialBgColorClassNames,
    }

    this.setState(prevState => ({
      userDetailsList: [...prevState.userDetailsList, newUser],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      searchInput: '',
    }))
  }

  onCheckBox = () => {
    this.setState(prevState => ({
      checked: !prevState.checked,
    }))
  }

  getSearchResults = () => {
    const {searchInput, userDetailsList} = this.state
    const searchResults = userDetailsList.filter(eachApp =>
      eachApp.appName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResults
  }

  deleteUserDetails = Id => {
    const {userDetailsList} = this.state
    this.setState({
      userDetailsList: userDetailsList.filter(
        userDetails => userDetails.id !== Id,
      ),
    })
  }

  render() {
    const {
      userDetailsList,
      websiteInput,
      usernameInput,
      passwordInput,
      checked,
      searchInput,
    } = this.state
    const searchedResult = userDetailsList.filter(eachObject =>
      eachObject.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    let resultView
    if (userDetailsList.length === 0 || searchedResult.length === 0) {
      resultView = (
        <div className="no-results-container">
          <img
            className="no-password-image"
            alt="no passwords"
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          />
          <p className="no-passwords-heading">No Passwords</p>
        </div>
      )
    } else {
      resultView = (
        <ul className="unordered-list-container">
          {searchedResult.map(eachObject => (
            <PasswordItem
              key={eachObject.id}
              userDetails={eachObject}
              checked={checked}
              deleteUserDetails={this.deleteUserDetails}
            />
          ))}
        </ul>
      )
    }

    return (
      <div className="app_container">
        <div className="responsive_container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app_logo"
          />
          <div className="userDetails_container">
            <div className="add_userDetail_container">
              <form className="form" onSubmit={this.onAdd}>
                <h1 className="form_heading">Add New Passwords</h1>
                <div className="form_input_container">
                  <div className="input_icon_container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                      className="input_icon"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Website"
                    className="form_input"
                    value={websiteInput}
                    onChange={this.onWebsite}
                  />
                </div>
                <div className="form_input_container">
                  <div className="input_icon_container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                      className="input_icon"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="form_input"
                    value={usernameInput}
                    onChange={this.onUsername}
                  />
                </div>
                <div className="form_input_container">
                  <div className="input_icon_container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                      className="input_icon"
                    />
                  </div>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="form_input"
                    value={passwordInput}
                    onChange={this.onPassword}
                  />
                </div>
                <button type="submit" className="add_button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="password_manager_image"
              />
            </div>
          </div>
          <div className="userDetailsList_container">
            <div className="header_container">
              <div className="header_heading_container">
                <h1 className="your_passwords_heading">Your Passwords</h1>
                <p className="count">{userDetailsList.length}</p>
              </div>
              <div className="search_container">
                <div className="search_icon_container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="search_icon"
                  />
                </div>
                <input
                  type="search"
                  placeholder="Search"
                  className="search_input"
                  value={searchInput}
                  onChange={this.onSearch}
                />
              </div>
            </div>
            <hr className="breakout_line" />
            <div className="check_box_container">
              <input
                id="checkBox"
                type="checkbox"
                className="check_box"
                value={checked}
                onChange={this.onCheckBox}
              />
              <label htmlFor="checkBox" className="label_text">
                Show Passwords
              </label>
            </div>
            <div className="userPasswordDetailsList">{resultView}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
