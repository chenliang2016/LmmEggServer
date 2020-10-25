import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Input,TreeSelect } from 'antd'

import { Page,Crud } from '../../components'

const {CrudTable,CrudForm,CrudFilter,CrudButtons} = Crud

export class DeptPage extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
     const { deptPage,currentDept} = this.props.admin;
     console.log("状态");
     console.log(this.props.admin);
     this.fetchList( deptPage);
  }

  fetchList = (page,name) => {
    const {getDeptList,getAllDept} = this.props.actions;
    getDeptList(page);
    getAllDept()
  }

  getDataSource() {
    const { admin } = this.props;
    const { deptById, deptList } = admin;
    if (!deptList) return [];
    return deptList.map(id => deptById[id]);
  }

  get listProps() {
    const { admin,actions } = this.props
    const { getDeptListPending,deptTotal,deptPage,deptById } = admin
    const { deleteDept,chooseCurrentDept,deptModalChange } = actions;

    return {
      dataSource: this.getDataSource(),
      loading: getDeptListPending,
      columns:[
        {
          title: "部门名称",
          dataIndex: 'deptName',
          key: 'deptName',
          width: 180,
        },
        {
          title: "父部门",
          dataIndex: 'pid',
          key: 'pid',
          width: 180,
          render: text => {
            if (text == 1){
              return <span></span>
            }else{
              let item = deptById[text];
              if (item != undefined){
                return  <span>{item.deptName}</span>
              }
            }
           
          },
        },
      ],
      pagination:{
        total:deptTotal,
        current:deptPage,
        onChange : (page) => {
          this.fetchList(page);
        }
      },
      op:[
        {
            key:1,
            name:'编辑',
          //   color:"#ffffff",
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
          chooseCurrentDept(record);
          deptModalChange(true,"updata");
        }else if(item.key == 3){
            deleteDept(record.id).then((data) => {
            this.fetchList(deptPage);
          })
        }
      }
    }
  } 

  get buttonProps() {
    const { location,actions,admin } = this.props
    const { query } = location
    const { currentDept,deptPage} = admin
    const { deptModalChange } = actions;
    return {
        buttons:[
            {
                name:"新增",
                buttonProps:{
                    type:"primary",
                    icon:"plus",
                },
                onClick:()=>{deptModalChange(true,'create')}
            },
        ]
    }
  }

  onChange = (value) => {
     console.log(value);
  }

  get modalProps() {
  
    const { admin,actions } = this.props
    const { currentDept, deptModalVisible,deptPage, deptModalType,submitDeptPending,deptTree } = admin

    const { deptModalChange,submitDept } = actions;
    const editItem  = deptModalType === 'create' ? {} : currentDept
    return {
      item: deptModalType === 'create' ? {} : currentDept,
      visible: deptModalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: submitDeptPending,
      title: `${
        deptModalType === 'create' ? `创建` : `更新`
      }`,
      centered: true,
      elements: [
        {
          key: "pid",
          label: "父部门",
          initialValue: editItem.pid,
          widget: TreeSelect,
          widgetProps:{
            treeData:deptTree,
            treeDefaultExpandAll:false,
            onChange:this.onChange,
          },
          required: false
        },
        {
          key: "deptName",
          label: "部门名称",
          initialValue: editItem.deptName,
          widget: Input,
          required: true
        },
      ],
      onOk: data => {
        submitDept(Object.assign({},data,{})).then(data=> {
          deptModalChange(false,"create");
          this.fetchList(deptPage);
        })
      },
      onCancel() {
        deptModalChange(false,"create");
      },
    }
  }

  get filterProps() {
    const { location,actions,admin } = this.props
    const { query } = location
    const { currentDept,deptPage} = admin
    const { deptModalChange } = actions;

    return {
      filter: {
        ...query,
      },
      title:"",
      onFilterChange: value => {
         this.fetchList(deptPage,value.name)
      },
      onAdd() {
        deptModalChange(true,'create')
      },
    }
  }

  render() {
    return (
      <Page inner>
        <CrudFilter {...this.filterProps} />
        <CrudButtons {...this.buttonProps} />
        <CrudTable {...this.listProps} />
        <CrudForm {...this.modalProps} />
      </Page>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    admin: state.admin,
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
)(DeptPage);