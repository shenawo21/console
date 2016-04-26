import React, {
  PropTypes,
  Component
} from 'react'
import {
  connect
} from 'react-redux'
import {
  load,
  remove
} from '../modules/repo'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Repo from '../components/Repo'

class RepoContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.load();
    if (this.props.deleted) {
      this.props.load();
    }
  }
  deleteRepo(owner, repo) {
    this.props.remove(owner, repo)
  }
  render() {
    console.log(this.props);
    return <ul className="list-group list-group-full">
      {
        this.props.repos.map((repo) => {
          return <Repo repo={repo} key={repo.id} remove={ this.deleteRepo.bind(this, repo.owner.login, repo.name) }/>
        })
      }
    </ul>
  }
}

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapActionCreators = {
  load,
  remove
}

const mapStateToProps = (state) => ({
  repos: state.repo.repo,
  deleted: state.deleted
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapActionCreators)(RepoContainer)
