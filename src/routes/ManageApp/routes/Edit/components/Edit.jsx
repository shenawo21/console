import React from 'react';
import {Steps} from 'hen';
const Step = Steps.Step;
export default ({steps}) => {
  console.log(steps)
  return <div>
    <Steps current='1'>
      {steps.map((s, i) => <Step key={i} title={s.title} description={s.description} />)}
    </Steps>
  </div>
}


