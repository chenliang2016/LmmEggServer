import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Input,Select } from 'antd'

import { Page,Crud } from '../../components'
import moment from 'moment'
const Option = Select.Option

const {CrudTable,CrudForm,CrudFilter,CrudButtons} = Crud

export class MysqltablePage extends Component {
  static propTypes = {
    generate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
     const { mysqltablePage,currentMysqltable} = this.props.generate;
     this.fetchList( mysqltablePage);
  }

  fetchList = (page,values) => {
    const {getMysqltableList} = this.props.actions;
    let params = Object.assign({},{page:page},values)
    getMysqltableList(params);
  }

  getDataSource() {
    const { generate } = this.props;
    const { mysqltableById, mysqltableList } = generate;
    if (!mysqltableList) return [];
    return mysqltableList.map(id => mysqltableById[id]);
  }

  get listProps() {
    const { generate,actions } = this.props
    const { getMysqltableListPending,mysqltableTotal,mysqltablePage } = generate
    const { deleteMysqltable,chooseCurrentMysqltable,mysqltableModalChange } = actions;

    return {
      dataSource: this.getDataSource(),
      loading: getMysqltableListPending,
      columns:[
        {
          title: "表名",
          dataIndex: 'table_name',
          key: 'table_name',
          width: 180,
        },
        {
          title: "引擎",
          dataIndex: 'engine',
          key: 'engine',
          width: 180,
        },
        {
          title: "字符编码集",
          dataIndex: 'table_collation',
          key: 'table_collation',
          width: 180,
        },
        {   
          title: "备注",
          dataIndex: 'table_comment',
          key: 'table_comment',
          width: 180,
        },
        {
          title: "创建时间",
          dataIndex: 'create_time',
          key: 'create_time',
          width: 180,
          render: text => <span>{moment(text).format("YYYY-MM-DD HH:mm:ss")}</span>,
        },
      ],
      pagination:{
        total:mysqltableTotal,
        current:mysqltablePage,
        onChange : (page) => {
          this.fetchList(page);
        }
      },
      op:[
        {
          key:1,
          name:'生成',
        },
        // {
        //   key:3,
        //   name:'生成前端',
        // }
      ],
      handleMenuClick: (record,item) => {
        if (item.key == 1){
          chooseCurrentMysqltable(record);
          mysqltableModalChange(true,"updata");
        }else if(item.key == 3){
            deleteMysqltable(record.id).then((data) => {
            this.fetchList(mysqltablePage);
          })
        }
      }
    }
  } 

  getType = () => {
    let list = [
        {
            id:1,
            name:"是"
        },
        {
            id:0,
            name:"否"
        }
    ]
    return list.map(item => (
          <Option key={item.id}>{item.name}</Option>
    ))
}

  get modalProps() {
    const { generate,actions } = this.props
    const { currentMysqltable, mysqltableModalVisible,mysqltablePage, mysqltableModalType,submitMysqltablePending } = generate

    const { mysqltableModalChange,submitMysqltable } = actions;
    const editItem  = mysqltableModalType === 'create' ? {} : currentMysqltable
    return {
      item: mysqltableModalType === 'create' ? {} : currentMysqltable,
      visible: mysqltableModalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: submitMysqltablePending,
      title: `${
        mysqltableModalType === 'create' ? `创建` : `更新`
      }`,
      centered: true,
      elements: [
        {
            key: "table",
            label: "表名",
            initialValue: editItem.table_name,
            widget: Input,
            required: true
        },
        {
          key: "class_name",
          label: "类名",
        //   initialValue: editItem.class_name,
          widget: Input,
          required: true
        },
        {
          key: "package",
          label: "包名",
        //   initialValue: editItem.package,
          widget: Input,
          required: true
        },
        {
          key: "isToDir",
          label: "是否到工程",
        //   initialValue: editItem.isToDir,
            widget: Select,
            children:this.getType(),
        },
        {
          key: "isFront",
          label: "是否生成前端",
        //   initialValue: editItem.isToDir,
            widget: Select,
            children:this.getType(),
        },
        {
          key: "feature",
          label: "feature",
        //   initialValue: editItem.isToDir,
          widget: Input,
          required: true
        },
        
        
      ],
      onOk: data => {
        submitMysqltable(Object.assign({},data,{})).then(data=> {
          mysqltableModalChange(false,"create");
          this.fetchList(mysqltablePage);
        })
      },
      onCancel() {
        mysqltableModalChange(false,"create");
      },
    }
  }

  get filterProps() {
    const { actions,generate } = this.props
    const { currentMysqltable,mysqltablePage} = generate
    const { mysqltableModalChange } = actions;

    return {
      title:"",
      searchElements: [
        {
            key: "loginId",
            widget: Input,
            widgetProps:{
                placeholder:"请输入登录名"
            },
        },
      ],
      onFilterChange: value => {
         this.fetchList(mysqltablePage,value)
      },
      onAdd() {
        mysqltableModalChange(true,'create')
      },
    }
  }

  get buttonProps() {
    const { actions,generate } = this.props
    const { currentMysqltable,mysqltablePage} = generate
    const { mysqltableModalChange } = actions;

    return {
        buttons:[
            {
                name:"同步",
                buttonProps:{
                    type:"primary",
                },
                onClick:()=>{ mysqltableModalChange(true,'create')}
            }
        ]
    }
  }

  render() {
    return (
      <Page inner>
        {/* <CrudFilter {...this.filterProps} /> */}
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
)(MysqltablePage);