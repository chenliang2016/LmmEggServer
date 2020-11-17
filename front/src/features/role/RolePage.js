import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Input,Row,Col,Card,Tree,message,Button } from 'antd'

import { Page,Crud } from '../../components'

const {CrudTable,CrudForm,CrudFilter,CrudButtons} = Crud

export class RolePage extends Component {
  static propTypes = {
    role: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
     const { rolePage,currentRole} = this.props.role;
     this.fetchList( rolePage);
     const {getMenuTree} = this.props.actions;
     getMenuTree();
  }

  fetchList = (page,values) => {
    const {getRoleList} = this.props.actions;
    let params = Object.assign({},{page:page},values)
    getRoleList(params);
  }

  getDataSource() {
    const { role } = this.props;
    const { roleById, roleList } = role;
    if (!roleList) return [];
    return roleList.map(id => roleById[id]);
  }

  get listProps() {
    const { role,actions } = this.props
    const { getRoleListPending,roleTotal,rolePage } = role
    const { deleteRole,chooseCurrentRole,roleModalChange,getRoleMenu } = actions;

    return {
      dataSource: this.getDataSource(),
      loading: getRoleListPending,
      columns:[
        {
          title: "角色名",
          dataIndex: 'roleName',
          key: 'roleName',
          width: 180,
        },
        {
          title: "角色描述",
          dataIndex: 'roleDesc',
          key: 'roleDesc',
          width: 180,
        },
      ],
      pagination:{
        total:roleTotal,
        current:rolePage,
        onChange : (page) => {
          this.fetchList(page);
        }
      },
      rowSelection:{
        onChange:(keys,record) => {
            this.roleId = keys[0];
            console.log(this.roleId)
            getRoleMenu({roleId:this.roleId})
        },
        type:"radio"
    },
      op:[
       {
          key:1,
          name:'编辑',
          buttonProps:{
            icon:"edit",
            type:"primary"
          },
        },
        {
          key:3,
          name:'删除',
          buttonProps:{
            icon:"delete",
            type:"danger"
          },
          needConfirm:true,
          confirmTitle:"确认删除"
        }
      ],
      handleMenuClick: (record,item) => {
        if (item.key == 1){
          chooseCurrentRole(record);
          roleModalChange(true,"updata");
        }else if(item.key == 3){
            deleteRole(record.id).then((data) => {
            this.fetchList(rolePage);
          })
        }
      }
    }
  } 

  get modalProps() {
    const { role,actions } = this.props
    const { currentRole, roleModalVisible,rolePage, roleModalType,submitRolePending } = role

    const { roleModalChange,submitRole } = actions;
    const editItem  = roleModalType === 'create' ? {} : currentRole
    return {
      item: roleModalType === 'create' ? {} : currentRole,
      visible: roleModalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: submitRolePending,
      title: `${
        roleModalType === 'create' ? `创建` : `更新`
      }`,
      centered: true,
      elements: [
        {
          key: "roleName",
          label: "角色名",
          initialValue: editItem.roleName,
          widget: Input,
          required: true
        },
        {
          key: "roleDesc",
          label: "角色描述",
          initialValue: editItem.roleDesc,
          widget: Input,
          required: true
        },
      ],
      onOk: data => {
        submitRole(Object.assign({},data,{})).then(data=> {
          roleModalChange(false,"create");
          this.fetchList(rolePage);
        })
      },
      onCancel() {
        roleModalChange(false,"create");
      },
    }
  }

  onCheck = (checkedKeys) => {
      console.log("checkedKeys",checkedKeys)
    const { onCheckKeys } = this.props.actions;
    onCheckKeys(checkedKeys);
    
  }

  saveRoleMenu = () => {
    const { saveRoleMenu } = this.props.actions;
    const {role} = this.props;
    const { menuTreeData,checkMenuKeys } = role
    
    if (this.roleId == undefined){
        message.error("请选择角色");
        return;
    }

    if (checkMenuKeys.checked != undefined && checkMenuKeys.checked.length == 0){
        message.error("未选择任何菜单");
        return;
    }
    
    let params = {
        roleId:this.roleId,
        menuIds:checkMenuKeys.checked.join(";"),
    }
    saveRoleMenu(params).then(data => {
        message.success("保存成功")
    });
  }

  get menuTree(){
        const {role} = this.props;
        const { menuTreeData,checkMenuKeys } = role
        const tProps = {
            treeData: menuTreeData,
            checkedKeys: checkMenuKeys,
            checkable: true,
            // value: this.state.value,
            onCheck:this.onCheck,
            onChange: this.onChange,
            treeCheckable: true,
            checkStrictly:true,
            // showCheckedStrategy: SHOW_PARENT,
            searchPlaceholder: '请选择',
            style: {
            width: '100%',
            },
        };
        return tProps;
  }

  render() {
    const { actions,role } = this.props
    const { roleModalChange,saveRoleMenu } = actions;
    return (
      <Page inner>
        <Row>
            <Col span={16} style={{paddingRight:20}}>
                <Card size="small" title="角色" extra={<Button type="primary" onClick={() => roleModalChange(true,'create')}>新增</Button>} >
                <CrudTable {...this.listProps} />
                <CrudForm {...this.modalProps} />
                </Card>
            </Col>
            <Col span={8}>
                <Card size="small" title="菜单" extra={<Button type="primary" onClick={() => this.saveRoleMenu()}>保存</Button>} >
                <Tree {...this.menuTree} />
                </Card>
            </Col>
          </Row>
      </Page>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    role: state.role,
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
)(RolePage);