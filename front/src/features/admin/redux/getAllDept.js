import {
  ADMIN_GET_ALL_DEPT_BEGIN,
  ADMIN_GET_ALL_DEPT_SUCCESS,
  ADMIN_GET_ALL_DEPT_FAILURE,
  ADMIN_GET_ALL_DEPT_DISMISS_ERROR,
} from './constants';
  import request from '../../../utils/request'
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getAllDept(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ADMIN_GET_ALL_DEPT_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
          request({
            method:'post',
            url:'/api/b/dept/list',
          }).then( data => {
              dispatch({
                  type: ADMIN_GET_ALL_DEPT_SUCCESS,
                  data: data,
              });
              resolve(data);
          }).catch (error => {
              dispatch({
                type: ADMIN_GET_ALL_DEPT_FAILURE,
                data: { error: error },
              });
              reject(error);
          })
      });

    return promise;
  };
}

function convertToTree(nodeList){
  let tree = [];
  for (let node of nodeList){
    if (node.pid == -1){
      let treeChilds = generateSubTree(node,nodeList);
      node.children = treeChilds;
      
      tree.push(convertTreeComponetNode(node));
    }
  }
  return tree;
}

function generateSubTree(treeNode,nodelist){
    let childs = [];
    for (let node of nodelist){
      if (node.pid == treeNode.id){
        let nodeChilds = generateSubTree(node,nodelist);
        node.children = nodeChilds;
        childs.push(convertTreeComponetNode(node));
      }
    }
    return childs;
}

function convertTreeComponetNode(treeNode){
   return {
      title: treeNode.deptName,
      value: treeNode.id,
      key: treeNode.id,
      children:treeNode.children,
   }
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetAllDeptError() {
  return {
    type: ADMIN_GET_ALL_DEPT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ADMIN_GET_ALL_DEPT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getAllDeptPending: true,
        getAllDeptError: null,
      };

    case ADMIN_GET_ALL_DEPT_SUCCESS:
      // The request is success
      console.log(action.data.list);
      let deptTree = convertToTree(action.data.list);
      let byId = {};
      action.data.list.forEach(item => {
          byId[item.id] = item;
      });
      console.log(deptTree);
      return {
        ...state,
        getAllDeptPending: false,
        getAllDeptError: null,
        deptTree:deptTree,
        allDeptById:byId
      };

    case ADMIN_GET_ALL_DEPT_FAILURE:
      // The request is failed
      return {
        ...state,
        getAllDeptPending: false,
        getAllDeptError: action.data.error,
      };

    case ADMIN_GET_ALL_DEPT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getAllDeptError: null,
      };

    default:
      return state;
  }
}
