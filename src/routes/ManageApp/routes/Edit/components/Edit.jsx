import React from 'react';
import {Steps,Button} from 'hen';
const Step = Steps.Step;

import Basic from './Basic';
import Generate from './Generate';
import Start from './Start';
import Template from './Template';
import Widget from './Widget';

const getComponent = (step)=>{
  switch (step){
    case 0:
          return <Template/>;
    case 1:
          return <Basic/>;
    case 2:
          return <Start/>;
    case 3:
          return <Widget/>;
    case 4:
          return <Generate/>;
    default:
          return '';
  }
};

export default ({steps,step,next}) => {
   return <div>
    <Steps current={step}>
      {steps.map((s, i) => <Step key={i} title={s.title} description={s.description} />)}
    </Steps>
    {getComponent(step)}
    <Button onClick={next} type="ghost">下一步</Button>
  </div>
}


