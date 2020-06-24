import React from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({
  setUsername,
  handleLogin,
  username,
  setPassword,
  password
}) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
                username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setUsername: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setPassword: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm