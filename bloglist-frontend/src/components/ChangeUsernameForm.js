import PropTypes from 'prop-types'
const ChangeUsernameForm = ({
  handleSubmit,
  handleUsernameChange,
  username,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>change username</div>
        <input
          id='username'
          value={username}
          onChange={handleUsernameChange}
        />
        <button id='login-button' type="submit">change</button>
      </form>
    </div>
  )
}


ChangeUsernameForm.propTypes = {
  handleUsernameChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default ChangeUsernameForm