import React, { Component, PropTypes } from 'react';
import {Breadcrumb} from 'hen';
import Helmet from "react-helmet";
import config from '../../common/config';
class Page extends Component {
  render() {
    const {children, title} = this.props;
    const {route} = children.props;
    const pageTitle = title || route.breadcrumbName;
    return (
      <div className="page">
        <Helmet {...config.app} title={pageTitle}/>

        <div className="page-header">
          {/*<h1 className="page-title">{pageTitle}</h1>*/}
          <div className="breadcrumb">
            <Breadcrumb {...children.props}/>
          </div>
        </div>

        <div className="page-content">
          {children}
        </div>
      </div>
    )
  }
}

Page.propTypes = {
  title: PropTypes.string
};
export default Page;

