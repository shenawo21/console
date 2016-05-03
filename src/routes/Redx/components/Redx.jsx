import React from 'react';

export default (props)=>{
    console.log(props);
   return (<div>
        <h1>{props.data.data.aaa}</h1>
        <h1>{props.data.data.b}</h1>
        <h1>{props.data.data.c}</h1>
        <a href='javascript:;' onClick={props.handleBack}>aa</a>
    </div>)
}
