import React,{Component, PropTypes} from 'react';
import {Steps} from 'hen';
const Step = Steps.Step;
export default ({steps}) => {
  return <div>
      steps.map((s, i) =><Step key={i} title={s.title} description={s.description} />
  </div>
}


