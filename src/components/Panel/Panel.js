import React from 'react'

export default ({title,children,className}) => {
  return (
    <div className={`panel ${className}`}>
      <div className="panel-heading">
        <h3 className="panel-title">{title}</h3>
      </div>
      <div className="panel-body">
        {children}
      </div>
    </div>
  )
}
