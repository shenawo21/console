import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export class <%= pascalEntityName %> extends React.Component {

  render() {
    return (
      <div><%= pascalEntityName %></div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(<%= pascalEntityName %>)
