import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import LoginComponent from '../components/Login'
import {doLoad} from '../modules/login'
import Cookie from 'js-cookie';

export class Login extends Component {
  constructor(props) {
    super(props)
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

  handleReset(e, form) {
    e.preventDefault();
    form.resetFields();
  }

  handleSubmit(e, form) {
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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn === true && nextProps.result !== undefined) {
      let pathname = '/';
      this.context.router.replace(pathname);
    }
  }

  componentWillUnmount() {
    document.onkeydown = () => { }
  }

  render() {
    const {loading} = this.props;
    return (
      <LoginComponent handleSubmit={this.handleSubmit} handleReset={this.handleReset}  isLoading={loading}/>
    )
  }
}

Login.propsTypes = {
  result: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool.isRequired,
  isLoggedIn: React.PropTypes.bool.isRequired
};

Login.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const {login} = state;
  const {result, loading, isLoggedIn} = login;
  if (result && result.data.sessionId) {
    Cookie.set('sessionId', result.data.sessionId)
  }
  return {
    result,
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
