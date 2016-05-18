import React from 'react'
import panelClass from './panel.less'

export default ({title,children,className}) => {
  return (
    <div className="panel" className={panelClass.panel + ` ${className}`}>
    
      {
          title && <div className="panel-heading" className={panelClass.panel_head}>
            <h3 className="panel-title">{title}</h3>
          </div>
      }
      <div className="panel-body" className={panelClass.panel_contant}>
        {children}
      </div>
    </div>
  )
}