import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import NProgress from 'nprogress'
import md5 from 'md5'

import {
  pathMatchRegexp
} from '../../utils'

import { BackTop, Layout, Input, message } from 'antd'
import { MyLayout } from '../../components'
import { Page,Crud } from '../../components'

const {CrudTable,CrudForm,CrudFilter,CrudButtons} = Crud

const { Content } = Layout
const { Sider,Header,Bread } = MyLayout

export class CommonLayout extends Component {
  previousPath = ''
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  onCollapseChange = () => {
     const {actions} = this.props;
     const {collapseChange} = actions;
     collapseChange();
  }

  get modalProps() {
      const {common,actions} = this.props;
      const {changePasswordModal} = common;
      const {changePassword,changePasswordVisible} = actions;
      const loginId = sessionStorage.getItem("loginId");
    return {
      item: {},
      visible: changePasswordModal,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: false,
      title: `修改密码`,
      centered: true,
      elements: [
        {
          key: "loginId",
          label: "账户名",
          initialValue: loginId,
          widget: Input,
          widgetProps:{
            disabled:true,
          },
          required: true
        },
        {
            key: "oldPassword",
            label: "老密码",
            widget: Input,
            required: true
          },
          {
            key: "newPassword",
            label: "新密码",
            widget: Input,
            required: true
          },
      ],
      onOk: data => {
        changePassword(Object.assign({},data,{oldPassword:md5(data.oldPassword),
            newPassword:md5(data.newPassword),loginId})).then(data=> {
         message.success("修改成功")
         changePasswordVisible(false)
        })
      },
      onCancel() {
        changePasswordVisible(false)
      },
    }
  }

  render() {

    const {common,login,location,actions}  = this.props;
    const {collapsed,routeList,loading} = common
    const {changePasswordVisible} = actions

    const currentPath = location.pathname + location.search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }

    if (!loading) {
      NProgress.done()
      this.previousPath = currentPath
    }

    const fixed = true;
    const menus = routeList.filter(_ => _.menuParentId !== '-1').filter(_ => _.show !== false)
    const currentRoute = routeList.find(
      _ => _.route && pathMatchRegexp(_.route, location.pathname)
    )

    const notifications = [];

    const headerProps = {
      menus,
      fixed,
      collapsed,
      notifications,
      onCollapseChange:this.onCollapseChange,
      avatar: "",
      username: login.userName,
      
      onSignOut() {
          actions.logout()
      },
      onChangePassword() {
        changePasswordVisible(true)
      },
    }

    const siderProps = {
      theme:"light",
      menus,
      collapsed,
      location,
    }

    return (
      <div className="common-layout">
        <Fragment>
        <Layout>
        <Sider {...siderProps} />
        <div 
          className="container" 
          style={{ paddingTop: fixed ? 72 : 0 }}
          id="primaryLayout">
          <Header {...headerProps} />
          <Content className="content">
             <Bread routeList={routeList} location={location} />
            {this.props.children}
          </Content>
          <BackTop
              className="backTop"
              target={() => document.querySelector('#primaryLayout')}
            />
        </div>
       </Layout>
      </Fragment>
      <CrudForm {...this.modalProps} />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    common: state.common,
    login: state.login,
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
)(CommonLayout);
