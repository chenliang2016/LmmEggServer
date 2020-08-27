import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import {Page} from '../../components'

import Node from './Node'
import Front from './Front'
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export class DefaultPage extends Component {
  static propTypes = {
    generate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  get nodeProps(){
    const {actions,generate} = this.props;
    const {submitNode} = actions;
    const { downloadUrl }= generate
    return {
      downloadUrl:downloadUrl,
      submitNode:(values) => {
        console.log("提交的数据");
        console.log(values);
        submitNode(values)
      }
    }
  }

  get frontProps(){
    const {actions,generate} = this.props;
    const {submitFront} = actions;
    const { downloadUrl }= generate
    return {
      downloadUrl:downloadUrl,
      submitFront:(values) => {
        console.log("提交的数据");
        console.log(values);
        submitFront(values)
      }
    }
  }

  render() {
    return (
      <Page className="generate-default-page" inner>
        <Tabs defaultActiveKey="1">
          <TabPane tab="NODE后端" key="1">
           <Node {...this.nodeProps} />
          </TabPane>
          <TabPane tab="REACT前端" key="2">
             <Front {...this.frontProps} />
          </TabPane>
          <TabPane tab="JAVA" key="3">
          </TabPane>
        </Tabs>
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
