import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import LoginComponent from '../components/Login'
import {login} from 'store/auth'
import Cookie from 'js-cookie';
import store from 'store2';


const sessionId = 'sessionId';

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
      store.clearAll();
      Cookie.remove(sessionId);
      this.props.login(values);
    });
  }

  componentDidMount() {
    const context = this;
    document.onkeydown = function (e) {
      let eventCode = e.which || e.keyCode;
      switch (eventCode) {
        case 13:
          //context.handleSubmit(e)
          break;
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== null && nextProps.user !== undefined && nextProps.user !== false) {
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
  user: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool.isRequired
};

Login.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  const {auth} = state;
  const {user, loading} = auth;
  if (user && user.sessionId) {
      Cookie.set(sessionId, user.sessionId);
  }
  return {
    user,
    loading
  }
}

const mapDispatchToProps = {
  login
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
