// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.

const initialState = {
  collapsed:false,
  loading:false,
  changePasswordModal:false,
  routeList : [
    //   {
    //     id: '4',
    //     icon: 'shop',
    //     name: '代码生成器',
    //     route: '/generate',
    //   },
    //   {
    //     id: '5',
    //     icon: 'shop',
    //     name: '组织架构',
    //     route: '/construction/design',
    //   },
    //   {
    //     id: '51',
    //     icon: 'shop',
    //     name: '部门管理',
    //     menuParentId: "5",
    //     route: '/admin/dept',
    //   },
    //   {
    //     id: '52',
    //     icon: 'shop',
    //     name: '人员管理',
    //     menuParentId: "5",
    //     route: '/admin',
    //   },
    //   {
    //     id: '53',
    //     icon: 'shop',
    //     name: '字典管理',
    //     menuParentId: "5",
    //     route: '/admin/dicName',
    //   },
    //   {
    //     id: '54',
    //     icon: 'shop',
    //     name: '存储管理',
    //     menuParentId: "5",
    //     route: '/file',
    //   },
    //   {
    //     id: '55',
    //     icon: 'shop',
    //     name: '菜单管理',
    //     menuParentId: "5",
    //     route: '/role/menu',
    //   },
    //   {
    //     id: '56',
    //     icon: 'shop',
    //     name: '角色管理',
    //     menuParentId: "5",
    //     route: '/role/role',
    //   },
    ],
  changePasswordPending: false,
  changePasswordError: null,
};

export default initialState;
