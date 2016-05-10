import React,{Component, PropTypes} from 'react';
import {Link} from 'react-router';
import { Button, Row, Col, Input, InputNumber, Pagination, message, Checkbox} from 'hen';
import AppIntro from '../../AppIntro/Intro';
import classes from './List.less'

class Add extends Component{

  render() {
    return (
      <div>
        <div className={classes.list}>
          <div className={classes.item}>
            <AppIntro />
          </div>
          <div className={classes.item}>
            <AppIntro />
          </div>
          <div className={classes.item}>
            <AppIntro />
          </div>
        </div>
        <Pagination className={classes.fr} showSizeChanger defaultCurrent={3} total={500} />
      </div>
    );
  } 

}

Add.propsTypes = {

}

export default Add;

