import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Input } from 'antd'

import { Page,Crud } from '../../components'

const {CrudTable,CrudForm,CrudFilter,CrudButtons} = Crud

export class InfoCategoryPage extends Component {
  static propTypes = {
    info: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount(){
     const { infoCategoryPage,currentInfoCategory} = this.props.info;
     this.fetchList( infoCategoryPage);
  }

  fetchList = (page,values) => {
    const {getInfoCategoryList} = this.props.actions;
    let params = Object.assign({},{page:page},values)
    getInfoCategoryList(params);
  }

  getDataSource() {
    const { info } = this.props;
    const { infoCategoryById, infoCategoryList } = info;
    if (!infoCategoryList) return [];
    return infoCategoryList.map(id => infoCategoryById[id]);
  }

  get listProps() {
    const { info,actions } = this.props
    const { getInfoCategoryListPending,infoCategoryTotal,infoCategoryPage } = info
    const { deleteInfoCategory,chooseCurrentInfoCategory,infoCategoryModalChange } = actions;

    return {
      dataSource: this.getDataSource(),
      loading: getInfoCategoryListPending,
      columns:[
        {
          title: "类别名",
          dataIndex: 'categoryName',
          key: 'categoryName',
          width: 180,
        },
        {
          title: "标签",
          dataIndex: 'tag',
          key: 'tag',
          width: 180,
        },
      ],
      pagination:{
        total:infoCategoryTotal,
        current:infoCategoryPage,
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
          chooseCurrentInfoCategory(record);
          infoCategoryModalChange(true,"updata");
        }else if(item.key == 3){
            deleteInfoCategory(record.id).then((data) => {
            this.fetchList(infoCategoryPage);
          })
        }
      }
    }
  } 

  get modalProps() {
    const { info,actions } = this.props
    const { currentInfoCategory, infoCategoryModalVisible,infoCategoryPage, infoCategoryModalType,submitInfoCategoryPending } = info

    const { infoCategoryModalChange,submitInfoCategory } = actions;
    const editItem  = infoCategoryModalType === 'create' ? {} : currentInfoCategory
    return {
      item: infoCategoryModalType === 'create' ? {} : currentInfoCategory,
      visible: infoCategoryModalVisible,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: submitInfoCategoryPending,
      title: `${
        infoCategoryModalType === 'create' ? `创建` : `更新`
      }`,
      centered: true,
      elements: [
        {
          key: "categoryName",
          label: "类别名",
          initialValue: editItem.categoryName,
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
      ],
      onOk: data => {
        submitInfoCategory(Object.assign({},data,{})).then(data=> {
          infoCategoryModalChange(false,"create");
          this.fetchList(infoCategoryPage);
        })
      },
      onCancel() {
        infoCategoryModalChange(false,"create");
      },
    }
  }

  get filterProps() {
    const { actions,info } = this.props
    const { currentInfoCategory,infoCategoryPage} = info
    const { infoCategoryModalChange } = actions;

    return {
      title:"",
      searchElements: [
        {
            key: "categoryName",
            widget: Input,
            widgetProps:{
                placeholder:"请输入名称"
            },
        },
      ],
      onFilterChange: value => {
         this.fetchList(infoCategoryPage,value)
      },
      onAdd() {
        infoCategoryModalChange(true,'create')
      },
    }
  }

  get buttonProps() {
    const { actions,info } = this.props
    const { currentInfoCategory,infoCategoryPage} = info
    const { infoCategoryModalChange } = actions;

    return {
        buttons:[
            {
                name:"新增",
                buttonProps:{
                    type:"primary",
                    icon:"plus",
                },
                onClick:()=>{ infoCategoryModalChange(true,'create')}
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
)(InfoCategoryPage);