import React, {Component, PropTypes} from 'react';
import {Button, Icon} from 'hen';

export const Collapse = ({header, children}) => {
    console.log(props);
    
    return <div>
        <div class="head">
            <div class="left">{header.title}</div>
            <div class="right">{header.button}</div>
        </div>
        <div class="content">{children}</div>
    </div>
}

export default Collapse;

let header = {
    title : 111,
    button : '<ul></ul>'
}
<Collapse header={header}>{children}</Collapse>