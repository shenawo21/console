import React,{Component, PropTypes} from 'react';
import {Link} from 'react-router';
import { Button, Row, Col, Input, InputNumber, Pagination, message, Checkbox} from 'hen';
import AppIntro from '../../AppIntro/Intro';

import classes from './List.less'

const handleDel = (i) => {
  return 1;
};


export default ({handleDel}) => {
    return (
      <div>
        <div className={classes.item}>
          <div className={classes.info}>   
            <AppIntro />
          </div>
          <ul className={classes.qrcode}>
            <li>
              <img src="" alt="" width="116px" height="116px" />
              <p><Button type="ghost">安卓下载及推广 </Button></p>
            </li>
            <li>
              <img src="" alt="" width="116px" height="116px" />
              <p><Button type="ghost">IOS下载及推广</Button></p>
            </li>
          </ul>
        </div>
        <div className={classes.item}>
          <div className={classes.info}>   
            <AppIntro />
          </div>
          <ul className={classes.qrcode}>
            <li>
              <img src="" alt="" width="116px" height="116px" />
              <p><Button type="ghost">安卓下载及推广 </Button></p>
            </li>
            <li>
              <img src="" alt="" width="116px" height="116px" />
              <p><Button type="ghost">IOS下载及推广</Button></p>
            </li>
          </ul>
        </div>
        
        <Pagination className={classes.fr} showSizeChanger defaultCurrent={3} total={500} />
      </div>
    );
  }
 

