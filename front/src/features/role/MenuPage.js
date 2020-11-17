import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Input,TreeSelect } from 'antd'

import { Page,Crud } from '../../components'

const {CrudTable,CrudForm,CrudFilter,CrudButtons} = Crud

export class MenuPage extends Component {
  static propTypes = {
    role: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
     const { menuPage,currentMenu} = this.props.role;
     const {getMenuTree} = this.props.actions;
     this.fetchList( menuPage);
     getMenuTree();
  }

  fetchList = (page,values) => {
    const {getMenuList} = this.props.actions;
    let params = Object.assign({},{page:page},values)
    getMenuList(params);
  }

  getDataSource() {
    const { role } = this.props;
    const { menuById, menuList } = role;
    if (!menuList) return [];
    return menuList.map(id => menuById[id]);
  }

  get listProps() {
    const { role,actions } = this.props
    const { getMenuListPending,menuTotal,menuPage,menuById } = role
    const { deleteMenu,chooseCurrentMenu,menuModalChange } = actions;

    return {
      dataSource: this.getDataSource(),
      loading: getMenuListPending,
      columns:[
        {
            title: "菜单名",
            dataIndex: 'name',
            key: 'name',
            width: 180,
        },
        {
            title: "菜单名",
            dataIndex: 'menuParentId',
            key: 'menuParentId',
            render: text => {
            if (text == undefined || text == -1){
              return <span></span>
            }else{
              let item = menuById[text];
              if (item != undefined){
                return  <span>{item.name}</span>
              }
            }
           
          },
        },
        {
            title: "面包屑上级",
            dataIndex: 'breadcrumbParentId',
            key: 'breadcrumbParentId',
            render: text => {
            if (text == undefined || text == -1){
              return <span></span>
            }else{
              let item = menuById[text];
              if (item != undefined){
                return  <span>{item.name}</span>
              }
            }
          },
        },
        {
            title: "路由",
            dataIndex: 'route',
            key: 'route',
            width: 180,
        },
        {
            title: "图标",
            dataIndex: 'icon',
            key: 'icon',
            width: 180,
        },
        {
            title: "是否展示",
            dataIndex: 'show',
            key: 'show',
            width: 180,
        },
        {
            title: "排序",
            dataIndex: 'orderNum',
            key: 'orderNum',
            width: 180,
        },
        
      ],
      pagination:{
        total:menuTotal,
        current:menuPage,
        onChange : (page) => {
          this.fetchList(page);
        }
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
          chooseCurrentMenu(record);
          menuModalChange(true,"updata");
        }else if(item.key == 3){
            deleteMenu(record.id).then((data) => {
            this.fetchList(menuPage);
          })
        }
      }
    }
  } 

  get modalProps() {
    const { role,actions } = this.props
    const { currentMenu, menuModalVisible,menuPage, menuModalType,submitMenuPending,menuTreeData } = role

    const { menuModalChange,submitMenu,getMenuTree } = actions;
    const editItem  = menuModalType === 'create' ? {} : currentMenu
    return {
      item: menuModalType === 'create' ? {} : currentMenu,
      visible: menuModalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: submitMenuPending,
      title: `${
        menuModalType === 'create' ? `创建` : `更新`
      }`,
      centered: true,
      elements: [
        {
            key: "menuParentId",
            label: "父菜单",
            initialValue: editItem.menuParentId,
            widget: TreeSelect,
            widgetProps:{
            treeData:menuTreeData,
            treeDefaultExpandAll:false,
            onChange:this.onChange,
            },
            required: false
        },
        {
            key: "breadcrumbParentId",
            label: "面包屑上级",
            initialValue: editItem.breadcrumbParentId,
            widget: TreeSelect,
            widgetProps:{
            treeData:menuTreeData,
            treeDefaultExpandAll:false,
            onChange:this.onChange,
            },
            required: false
        },
        {
          key: "name",
          label: "菜单名",
          initialValue: editItem.name,
          widget: Input,
          required: true
        },
        {
          key: "route",
          label: "路由",
          initialValue: editItem.route,
          widget: Input,
          required: true
        },
        {
          key: "icon",
          label: "图标",
          initialValue: editItem.icon,
          widget: Input,
          required: true
        },
        {
          key: "orderNum",
          label: "排序",
          initialValue: editItem.orderNum,
          widget: Input,
          required: true
        },
        {
          key: "show",
          label: "是否展示",
          initialValue: editItem.show,
          widget: Input,
          required: true
        },
      ],
      onOk: data => {
        submitMenu(Object.assign({},data,{})).then(data=> {
          menuModalChange(false,"create");
          this.fetchList(menuPage);
          getMenuTree();
        })
      },
      onCancel() {
        menuModalChange(false,"create");
      },
    }
  }

  get filterProps() {
    const { actions,role } = this.props
    const { currentMenu,menuPage} = role
    const { menuModalChange } = actions;

    return {
      title:"",
      searchElements: [
        {
            key: "name",
            widget: Input,
            widgetProps:{
                placeholder:"请输入菜单名"
            },
        },
      ],
      onFilterChange: value => {
         this.fetchList(menuPage,value)
      },
      onAdd() {
        menuModalChange(true,'create')
      },
    }
  }

  get buttonProps() {
    const { actions,role } = this.props
    const { currentMenu,menuPage} = role
    const { menuModalChange } = actions;

    return {
        buttons:[
            {
                name:"新增",
                buttonProps:{
                    type:"primary",
                    icon:"plus",
                },
                onClick:()=>{ menuModalChange(true,'create')}
            }
        ]
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
)(MenuPage);