import React, { PropTypes } from 'react'

function Login ({ children }) {
  return (
    <div className='login-layout'>
      {children}
    </div>
  )
}

Login.propTypes = {
  children: PropTypes.element
}

export default Login
