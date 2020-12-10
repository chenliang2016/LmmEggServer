import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Input } from 'antd'

import { Page,Crud } from '../../components'

const {CrudTable,CrudForm,CrudFilter,CrudButtons} = Crud

export class InfoDetailPage extends Component {
  static propTypes = {
    info: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
     const { infoDetailPage,currentInfoDetail} = this.props.info;
     this.fetchList( infoDetailPage);
  }

  fetchList = (page,values) => {
    const {getInfoDetailList} = this.props.actions;
    let params = Object.assign({},{page:page},values)
    getInfoDetailList(params);
  }

  getDataSource() {
    const { info } = this.props;
    const { infoDetailById, infoDetailList } = info;
    if (!infoDetailList) return [];
    return infoDetailList.map(id => infoDetailById[id]);
  }

  get listProps() {
    const { info,actions } = this.props
    const { getInfoDetailListPending,infoDetailTotal,infoDetailPage } = info
    const { deleteInfoDetail,chooseCurrentInfoDetail,infoDetailModalChange } = actions;

    return {
      dataSource: this.getDataSource(),
      loading: getInfoDetailListPending,
      columns:[
        {
          title: "开放平台应用",
          dataIndex: 'shopName',
          key: 'shopName',
          width: 180,
        },
      ],
      pagination:{
        total:infoDetailTotal,
        current:infoDetailPage,
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
          chooseCurrentInfoDetail(record);
          infoDetailModalChange(true,"updata");
        }else if(item.key == 3){
            deleteInfoDetail(record.id).then((data) => {
            this.fetchList(infoDetailPage);
          })
        }
      }
    }
  } 

  get modalProps() {
    const { info,actions } = this.props
    const { currentInfoDetail, infoDetailModalVisible,infoDetailPage, infoDetailModalType,submitInfoDetailPending } = info

    const { infoDetailModalChange,submitInfoDetail } = actions;
    const editItem  = infoDetailModalType === 'create' ? {} : currentInfoDetail
    return {
      item: infoDetailModalType === 'create' ? {} : currentInfoDetail,
      visible: infoDetailModalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: submitInfoDetailPending,
      title: `${
        infoDetailModalType === 'create' ? `创建` : `更新`
      }`,
      centered: true,
      elements: [
        {
          key: "shopName",
          label: "商户名",
          // initialValue: editItem.shopName,
          widget: Input,
          required: true
        },
        {
          key: "score",
          label: "score",
          // initialValue: editItem.score,
          widget: Input,
          required: true
        },
        {
          key: "subAppid",
          label: "商户公众号id",
          // initialValue: editItem.subAppid,
          widget: Input,
          required: true
        },
      ],
      onOk: data => {
        submitInfoDetail(Object.assign({},data,{})).then(data=> {
          infoDetailModalChange(false,"create");
          this.fetchList(infoDetailPage);
        })
      },
      onCancel() {
        infoDetailModalChange(false,"create");
      },
    }
  }

  get filterProps() {
    const { actions,info } = this.props
    const { currentInfoDetail,infoDetailPage} = info
    const { infoDetailModalChange } = actions;

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
         this.fetchList(infoDetailPage,value)
      },
      onAdd() {
        infoDetailModalChange(true,'create')
      },
    }
  }

  get buttonProps() {
    const { actions,info } = this.props
    const { currentInfoDetail,infoDetailPage} = info
    const { infoDetailModalChange } = actions;

    return {
        buttons:[
            {
                name:"新增",
                buttonProps:{
                    type:"primary",
                    icon:"plus",
                },
                onClick:()=>{ infoDetailModalChange(true,'create')}
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
)(InfoDetailPage);