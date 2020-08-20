import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Page} from '../../components'

import Node from './Node'

export class DefaultPage extends Component {
  static propTypes = {
    generate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  get nodeProps(){
    const {actions} = this.props;
    const {submitNode} = actions;
    return {
      submitNode:(values) => {
        console.log("提交的数据");
        console.log(values);
        submitNode(values)
      }
    }
  }

  render() {
    return (
      <Page className="generate-default-page" inner>
        <Node {...this.nodeProps} />
      </Page>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    generate: state.generate,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
