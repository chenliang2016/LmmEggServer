// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialState = {
  menuList:[],
  menuPage:1,
  menuSize:10,
  menuTotal:0,
  menuById:{},
  menuModalType:"create",
  menuModalVisible:false,
  currentMenu:{},
  getMenuListPending: false,
  getMenuListError: null,
  submitMenuPending: false,
  submitMenuError: null,
  deleteMenuPending: false,
  deleteMenuError: null,
  getMenuTreePending: false,
  getMenuTreeError: null,
  menuTreeData:{},
  roleList:[],
  rolePage:1,
  roleSize:10,
  roleTotal:0,
  roleById:{},
  roleModalType:"create",
  roleModalVisible:false,
  currentRole:{},
  getRoleListPending: false,
  getRoleListError: null,
  submitRolePending: false,
  submitRoleError: null,
  deleteRolePending: false,
  deleteRoleError: null,
  checkMenuKeys:[],
  saveRoleMenuPending: false,
  saveRoleMenuError: null,
  getRoleMenuPending: false,
  getRoleMenuError: null,
  getAllRolePending: false,
  getAllRoleError: null,
  allRole:[],
};

export default initialState;
