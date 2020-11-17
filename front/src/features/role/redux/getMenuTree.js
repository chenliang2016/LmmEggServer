import {
  ROLE_GET_MENU_TREE_BEGIN,
  ROLE_GET_MENU_TREE_SUCCESS,
  ROLE_GET_MENU_TREE_FAILURE,
  ROLE_GET_MENU_TREE_DISMISS_ERROR,
} from './constants';
import request from '../../../utils/request'
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getMenuTree(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: ROLE_GET_MENU_TREE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
        request({
          method:'post',
          url:'/api/b/menu/list',
        }).then( data => {
            dispatch({
                type: ROLE_GET_MENU_TREE_SUCCESS,
                data: data,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: ROLE_GET_MENU_TREE_FAILURE,
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
      if (node.menuParentId == undefined || node.menuParentId == -1){
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
        if (node.menuParentId == treeNode.id){
          let nodeChilds = generateSubTree(node,nodelist);
          node.children = nodeChilds;
          childs.push(convertTreeComponetNode(node));
        }
      }
      return childs;
  }
  
  function convertTreeComponetNode(treeNode){
     return {
        title: treeNode.name,
        value: treeNode.id,
        key: treeNode.id,
        children:treeNode.children,
     }
  }
// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetMenuTreeError() {
  return {
    type: ROLE_GET_MENU_TREE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ROLE_GET_MENU_TREE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getMenuTreePending: true,
        getMenuTreeError: null,
      };

    case ROLE_GET_MENU_TREE_SUCCESS:
      // The request is success
      let treeList = action.data.list;
      let treeData = convertToTree(treeList);
      return {
        ...state,
        getMenuTreePending: false,
        getMenuTreeError: null,
        menuTreeData:treeData
      };

    case ROLE_GET_MENU_TREE_FAILURE:
      // The request is failed
      return {
        ...state,
        getMenuTreePending: false,
        getMenuTreeError: action.data.error,
      };

    case ROLE_GET_MENU_TREE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getMenuTreeError: null,
      };

    default:
      return state;
  }
}
