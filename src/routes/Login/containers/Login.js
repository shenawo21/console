import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import LoginComponent from '../components/Login'
import {doLoad} from '../modules/login'
import {Cookie} from 'js-cookie';

export class Login extends Component {
  constructor(props) {
    super(props)
    console.log(this, props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  getValidateStatus(field) {
    const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;
    if (isFieldValidating(field)) {
      return 'validating';
    } else if (!!getFieldError(field)) {
      return 'error';
    } else if (getFieldValue(field)) {
      return 'success';
    }
  }

  handleReset(e,form) {
    e.preventDefault();
    form.resetFields();
  }

  handleSubmit(e,form) {
    e.preventDefault();
    form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      this.props.doLoad(values);
    });
  }

  componentDidMount() {
    const context = this;
    document.onkeydown = function (e) {
      let eventCode = e.which || e.keyCode;
      switch (eventCode) {
        case 13:
          context.handleSubmit(e)
          break;
      }
    }
    this._checkAuth();
  }

  componentWillUnmount() {
    document.onkeydown = () => { }
  }

  _checkAuth() {
    if (this.props.isLoggedIn) {
      const {location} = this.props;
      let prevState = null;
      let pathname = '/';
      // 跳转到指定页面
      //console.log(this.props);

      // this.context.router.replaceState(prevState, pathname);
      this.context.router.replace(pathname);
    }
  }

  render() {
    return (
      <LoginComponent handleSubmit={this.handleSubmit} handleReset={this.handleReset} {...this.props} />
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  const {login} = state;
  const {data, loading, isLoggedIn} = login;
  console.log(data)
  // if(data.sessionId){
  //     Cookie.set(token, data.sessionId)
  // }
  return {
    data,
    loading,
    isLoggedIn
  }
}
const mapDispatchToProps = {
  doLoad
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
