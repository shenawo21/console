import React,{Component, PropTypes} from 'react';
import {Link} from 'react-router';
import BusiImage from '../assets/BusiImage.png'
import AppcateImage1 from '../assets/AppcateImage1.png'
import AppcateImage2 from '../assets/AppcateImage2.png'
import classes from '../assets/App.less'
import {Row, Col} from 'hen';

class Add extends Component{

  render() {
    return (
      <div className={classes.add}>
        <h3>选择行业</h3>
        <Row>
          <Col span="3"><img className={classes.busi} src={BusiImage}/></Col>
        </Row>
        <h3>选择应用类别</h3>
        <Row>
          <Col span="5">
            <Link className={classes.hoverShadow} to='/manage/edit'><img className={classes.Appcate} src={AppcateImage1}/></Link>
          </Col>
          <Col span="5">
            <Link className={classes.hoverShadow} to='/manage/edit'><img className={classes.Appcate} src={AppcateImage2}/></Link>
          </Col>
        </Row>
      </div>
    );
  }

}

Add.propsTypes = {

}

export default Add;

