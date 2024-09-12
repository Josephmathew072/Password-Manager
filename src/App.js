// App.js
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const colors = [
  '#454f84',
  '#0b69ff',
  '#94a3b8',
  '#b6c3ca',
  '#7683cb',
  '#f59e0b',
  '#10b981',
  '#f97316',
  '#14b8a6',
  '#b91c1c',
  '#ffffff',
  '#0ea5e9',
  '#647480b',
]

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    showPasswords: false,
    searchValue: '',
    passwords: [],
    count: 0,
  }

  handleInputChangeWeb = event => {
    this.setState({website: event.target.value})
  }

  handleInputChangeuser = event => {
    this.setState({username: event.target.value})
  }

  handleInputChangepass = event => {
    this.setState({password: event.target.value})
  }

  handleAddPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    if (website && username && password) {
      const newPassword = {
        id: uuidv4(),
        website,
        username,
        password,
      }
      this.setState(prevState => ({
        passwords: [...prevState.passwords, newPassword],
        website: '',
        username: '',
        password: '',
        count: prevState.count + 1,
      }))
    }
  }

  handleToggleShowPasswords = () => {
    this.setState(prevState => ({
      showPasswords: !prevState.showPasswords,
    }))
  }

  handleSearch = event => {
    this.setState({searchValue: event.target.value})
  }

  handleDeletePassword = id => {
    this.setState(prevState => ({
      passwords: prevState.passwords.filter(password => password.id !== id),
    }))
  }

  render() {
    const {
      website,
      username,
      password,
      showPasswords,
      searchValue,
      passwords,
      count,
    } = this.state
    const selColor = colors
    const filteredPasswords = passwords.filter(eachPassword =>
      eachPassword.website.toLowerCase().includes(searchValue.toLowerCase()),
    )

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="password-manager-container">
          <form className="inputs-container" onSubmit={this.handleAddPassword}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-image"
              />
              <input
                type="text"
                className="website"
                placeholder="Enter Website"
                value={website}
                onChange={this.handleInputChangeWeb}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-image"
              />
              <input
                type="text"
                className="username"
                placeholder="Enter Username"
                value={username}
                onChange={this.handleInputChangeuser}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-image"
              />
              <input
                type="password"
                className="password"
                placeholder="Enter Password"
                value={password}
                onChange={this.handleInputChangepass}
              />
            </div>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            className="password-manager"
            alt="password manager"
          />
        </div>
        <div className="password-list">
          <div className="header">
            <div className="your-password">
              <h1 className="your-password-text">Your Passwords</h1>
              <p className="no-of-password">{count}</p>
            </div>
            <div className="search-input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-image"
              />
              <input
                type="search"
                placeholder="Search"
                value={searchValue}
                onChange={this.handleSearch}
                className="search"
              />
            </div>
          </div>
          <hr className="hr-line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={showPasswords}
              onChange={this.handleToggleShowPasswords}
              className="checkbox-input"
              id="search-id"
            />
            <label className="check-box-label" htmlFor="search-id">
              Show Passwords
            </label>
          </div>

          {filteredPasswords.length === 0 ? (
            <div className="no-lists-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-passwords-image"
              />
              <p className="no-passwords-text">No Passwords</p>
            </div>
          ) : (
            <ul className="lists-container">
              {filteredPasswords.map(eachPassword => (
                <li key={eachPassword.id} className="list">
                  <div
                    className="password-logo"
                    style={{
                      backgroundColor:
                        selColor[Math.floor(Math.random() * selColor.length)],
                    }}
                  >
                    {eachPassword.username.slice(0, 1)}
                  </div>
                  <div className="details">
                    <p className="website-name">{eachPassword.website}</p>
                    <p className="username-name">{eachPassword.username}</p>
                    {showPasswords ? (
                      <p className="password-name">{eachPassword.password}</p>
                    ) : (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars-image"
                      />
                    )}
                  </div>
                  <button
                    data-testid="delete"
                    type="button"
                    onClick={() => this.handleDeletePassword(eachPassword.id)}
                    className="delete-button"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="delete-image"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
