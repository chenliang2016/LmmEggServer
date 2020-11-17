import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Input, Row,Col, Card,message,Button } from 'antd'

import { Page,Crud } from '../../components'

const {CrudTable,CrudForm,CrudFilter,CrudButtons} = Crud

export class DicnamePage extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
     const { dicnamePage,currentDicname} = this.props.admin;
     this.fetchList( dicnamePage);
  }

  fetchList = (page,values) => {
    const {getDicnameList} = this.props.actions;
    let params = Object.assign({},{page:page},values)
    getDicnameList(params);
  }

  getDataSource() {
    const { admin } = this.props;
    const { dicnameById, dicnameList } = admin;
    if (!dicnameList) return [];
    return dicnameList.map(id => dicnameById[id]);
  }

  get listProps() {
    const { admin,actions } = this.props
    const { getDicnameListPending,dicnameTotal,dicnamePage } = admin
    const { deleteDicname,chooseCurrentDicname,dicnameModalChange } = actions;

    return {
      dataSource: this.getDataSource(),
      loading: getDicnameListPending,
      columns:[
        {
          title: "字典名",
          dataIndex: 'name',
          key: 'name',
          width: 180,
        },
        {
            title: "字典描述",
            dataIndex: 'description',
            key: 'description',
            width: 180,
        },
      ],
      pagination:{
        total:dicnameTotal,
        current:dicnamePage,
        onChange : (page) => {
          this.fetchList(page);
        }
      },
        rowSelection:{
            onChange:(keys,record) => {
                this.dicNameId = keys[0];
                console.log(this.dicNameId)
                this.fetchListValues(1)
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
          chooseCurrentDicname(record);
          dicnameModalChange(true,"updata");
        }else if(item.key == 3){
            deleteDicname(record.id).then((data) => {
            this.fetchList(dicnamePage);
          })
        }
      }
    }
  } 

  get modalProps() {
    const { admin,actions } = this.props
    const { currentDicname, dicnameModalVisible,dicnamePage, dicnameModalType,submitDicnamePending } = admin

    const { dicnameModalChange,submitDicname } = actions;
    const editItem  = dicnameModalType === 'create' ? {} : currentDicname
    return {
      item: dicnameModalType === 'create' ? {} : currentDicname,
      visible: dicnameModalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: submitDicnamePending,
      title: `${
        dicnameModalType === 'create' ? `创建` : `更新`
      }`,
      centered: true,
      elements: [
        {
          key: "name",
          label: "字典名",
          initialValue: editItem.name,
          widget: Input,
          required: true
        },
        {
          key: "description",
          label: "字典描述",
          initialValue: editItem.description,
          widget: Input,
          required: true
        },
      ],
      onOk: data => {
        submitDicname(Object.assign({},data,{})).then(data=> {
          dicnameModalChange(false,"create");
          this.fetchList(dicnamePage);
        })
      },
      onCancel() {
        dicnameModalChange(false,"create");
      },
    }
  }

  get filterProps() {
    const { location,actions,admin } = this.props
    const { query } = location
    const { currentDicname,dicnamePage} = admin
    const { dicnameModalChange } = actions;

    return {
      filter: {
        ...query,
      },
      title:"字典类型",
      onFilterChange: value => {
         this.fetchList(dicnamePage,value.name)
      },
      onAdd() {
        dicnameModalChange(true,'create')
      },
    }
  }

  get buttonProps() {
    const { location,actions,admin } = this.props
    const { query } = location
    const { currentDicname,dicnamePage} = admin
    const { dicnameModalChange } = actions;

    return {
        title:"字典类型",
        buttons:[
            {
                name:"新增",
                buttonProps:{
                    type:"primary",
                    icon:"plus",
                },
                onClick:()=>{ dicnameModalChange(true,'create')}
            },
        ]
    }
  }


  fetchListValues = (page,values) => {
    const {getDicvaluesList} = this.props.actions;
    let params = Object.assign({},{page:page,dicNameId:this.dicNameId},values)
    getDicvaluesList(params);
  }

  getDataSourceValues() {
    const { admin } = this.props;
    const { dicvaluesById, dicvaluesList } = admin;
    if (!dicvaluesList) return [];
    return dicvaluesList.map(id => dicvaluesById[id]);
  }

  get listPropsValues() {
    const { admin,actions } = this.props
    const { getDicvaluesListPending,dicvaluesTotal,dicvaluesPage } = admin
    const { deleteDicvalues,chooseCurrentDicvalues,dicvaluesModalChange } = actions;

    return {
      dataSource: this.getDataSourceValues(),
      loading: getDicvaluesListPending,
      columns:[
        {
            title: "所属字典",
            dataIndex: 'name',
            key: 'name',
            width: 180,
        },
        {
          title: "字典值",
          dataIndex: 'dicValue',
          key: 'dicValue',
          width: 180,
        },
        {
            title: "标签",
            dataIndex: 'tag',
            key: 'tag',
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
        total:dicvaluesTotal,
        current:dicvaluesPage,
        onChange : (page) => {
          this.fetchListValues(page);
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
          chooseCurrentDicvalues(record);
          dicvaluesModalChange(true,"updata");
        }else if(item.key == 3){
            deleteDicvalues(record.id).then((data) => {
            this.fetchListValues(dicvaluesPage);
          })
        }
      }
    }
  } 

  get modalPropsValues() {
    const { admin,actions } = this.props
    const { currentDicvalues, dicvaluesModalVisible,dicvaluesPage, dicvaluesModalType,submitDicvaluesPending } = admin

    const { dicvaluesModalChange,submitDicvalues } = actions;
    const editItem  = dicvaluesModalType === 'create' ? {} : currentDicvalues
    return {
      item: dicvaluesModalType === 'create' ? {} : currentDicvalues,
      visible: dicvaluesModalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: submitDicvaluesPending,
      title: `${
        dicvaluesModalType === 'create' ? `创建` : `更新`
      }`,
      centered: true,
      elements: [
        {
          key: "dicValue",
          label: "字典值",
          initialValue: editItem.dicValue,
          widget: Input,
          required: true
        },
        {
          key: "tag",
          label: "标签",
          initialValue: editItem.tag,
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
      ],
      onOk: data => {
          if (this.dicNameId == undefined){
              message.error("请先选择字典类型")
              return;
          }
        submitDicvalues(Object.assign({},data,{dicNameId:this.dicNameId})).then(data=> {
          dicvaluesModalChange(false,"create");
          this.fetchListValues(dicvaluesPage);
        })
      },
      onCancel() {
        dicvaluesModalChange(false,"create");
      },
    }
  }

  get filterPropsValues() {
    const { location,actions,admin } = this.props
    const {query} = location;
    const { currentDicvalues,dicvaluesPage} = admin
    const { dicvaluesModalChange } = actions;

    return {
      filter: {
        ...query,
      },
      onFilterChange: value => {
         this.fetchListValues(dicvaluesPage,value.name)
      },
      onAdd() {
        dicvaluesModalChange(true,'create')
      },
    }
  }

  get buttonPropsValues() {
    const { location,actions,admin } = this.props
    const { query } = location
    const { currentDicvalues,dicvaluesPage} = admin
    const { dicvaluesModalChange } = actions;

    return {
        title:"字典值",
        buttons:[
            {
                name:"新增",
                buttonProps:{
                    type:"primary",
                    icon:"plus",
                },
                onClick:()=>{ dicvaluesModalChange(true,'create')}
            },
        ]
    }
  }

  render() {
    const { actions } = this.props
    const { dicnameModalChange,dicvaluesModalChange } = actions;
    return (
      <Page inner>
          <Row>
              <Col span={12} style={{paddingRight:20}}>
                <Card size="small" title="字典类型" extra={<Button type="primary" onClick={() => dicnameModalChange(true,'create')}>新增</Button>} >
                <CrudTable {...this.listProps} />
                <CrudForm {...this.modalProps} />
                </Card>
              </Col>
              <Col span={12}>
                  <Card size="small" title="字典值" extra={<Button type="primary" onClick={() => dicvaluesModalChange(true,'create')}>新增</Button>} >
                    <CrudTable {...this.listPropsValues} />
                    <CrudForm {...this.modalPropsValues} />
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
)(DicnamePage);