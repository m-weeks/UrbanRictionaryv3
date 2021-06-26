import React from 'react';

const ErrorMessage = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <div style={{ color: 'red' }}>
      {error.message}
    </div>
  )
}

export default ErrorMessage;
