import PropTypes from 'prop-types'
const RegisterForm = ({
  handleSubmit,
  handleNameChange,
  name,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
           username
          <input
            id='username'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
            name
          <input
            id='name'
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
           password
          <input
            id='password'
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id='login-button' type="submit">create account</button>
      </form>
    </div>
  )
}


RegisterForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default RegisterForm