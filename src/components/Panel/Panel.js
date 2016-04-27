import React from 'react'

export default ({title,children}) => {
  return (
    <div className="panel">
      <div className="panel-heading">
        <h3 className="panel-title">{title}</h3>
      </div>
      <div className="panel-body">
        {children}
      </div>
    </div>
  )
}
