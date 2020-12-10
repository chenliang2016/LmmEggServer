import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Input } from 'antd'

import { Page,Crud } from '../../components'

const {CrudTable,CrudForm,CrudFilter,CrudButtons} = Crud

export class InfoPage extends Component {
  static propTypes = {
    info: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
     const { infoPage,currentInfo} = this.props.info;
     this.fetchList( infoPage);
  }

  fetchList = (page,values) => {
    const {getInfoList} = this.props.actions;
    let params = Object.assign({},{page:page},values)
    getInfoList(params);
  }

  getDataSource() {
    const { info } = this.props;
    const { infoById, infoList } = info;
    if (!infoList) return [];
    return infoList.map(id => infoById[id]);
  }

  get listProps() {
    const { info,actions } = this.props
    const { getInfoListPending,infoTotal,infoPage } = info
    const { deleteInfo,chooseCurrentInfo,gotoAddOrEdit } = actions;

    return {
      dataSource: this.getDataSource(),
      loading: getInfoListPending,
      columns:[
        {
          title: "标题",
          dataIndex: 'title',
          key: 'title',
          width: 180,
        },
        {
          title: "简述",
          dataIndex: 'shortDes',
          key: 'shortDes',
          width: 180,
        },
      ],
      pagination:{
        total:infoTotal,
        current:infoPage,
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
          gotoAddOrEdit("update",record);
        }else if(item.key == 3){
            deleteInfo(record.id).then((data) => {
            this.fetchList(infoPage);
          })
        }
      }
    }
  } 

  get filterProps() {
    const { actions,info } = this.props
    const { currentInfo,infoPage} = info
    const { gotoAddOrEdit } = actions;

    return {
      title:"",
      searchElements: [
        {
            key: "title",
            widget: Input,
            widgetProps:{
                placeholder:"请输入标题名"
            },
        },
      ],
      onFilterChange: value => {
         this.fetchList(infoPage,value)
      },
    }
  }

  get buttonProps() {
    const { actions,info } = this.props
    const { currentInfo,infoPage} = info
    const { gotoAddOrEdit } = actions;

    return {
        buttons:[
            {
                name:"新增",
                buttonProps:{
                    type:"primary",
                    icon:"plus",
                },
                onClick:()=>{ gotoAddOrEdit('create')}
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
      </Page>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    info: state.info,
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
)(InfoPage);