import React from 'react';
import {Steps,Button,Row, Col} from 'hen';
const Step = Steps.Step;

import Basic from './Basic';
import Generate from './Generate';
import Start from './Start';
import Template from './Template';
import Widget from './Widget';

const getComponent = (step)=>{
  switch (step){
    case 0:
          return <Basic/>;
    case 1:
          return <Template/>;
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

export default ({steps,step,next,prev}) => {
   return <div>
    <Steps current={step}>
      {steps.map((s, i) => <Step key={i} title={s.title} />)}
    </Steps>
    {getComponent(step)}

     <Row>
       <Col span={step == 0?'0':'1'} offset='1'>
         {
           /*step == 0?'':<Button onClick={prev} type="ghost">上一步</Button>*/
         }
         <Button onClick={prev} type="ghost">上一步</Button>
       </Col>
       <Col span="1" offset='1'>
         {
           step == steps.length-1?<Button type="ghost">生成应用</Button>:<Button onClick={next} type="ghost">下一步</Button>
         }
       </Col>
     </Row>
  </div>
}


