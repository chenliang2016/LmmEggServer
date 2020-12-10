// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as collapseChangeReducer } from './collapseChange';
import { reducer as setLoadingReducer } from './setLoading';
import { reducer as logoutReducer } from './logout';
import { reducer as changeRoleListReducer } from './changeRoleList';
import { reducer as changePasswordVisibleReducer } from './changePasswordVisible';
import { reducer as changePasswordReducer } from './changePassword';

const reducers = [
  collapseChangeReducer,
  setLoadingReducer,
  logoutReducer,
  changeRoleListReducer,
  changePasswordVisibleReducer,
  changePasswordReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
        let menu = sessionStorage.getItem("menu");
        let menuArray = [];
        if (menu != undefined){
            console.log("menu",JSON.parse(menu))
            menuArray = JSON.parse(menu);
        }
        let items = [];
        menuArray.map(item => {
            let menu = {
                id: `${item.id}`,
                icon:  `${item.icon}`,
                name: `${item.name}`,
                route: `${item.route}`,
                show: `${item.show}`,
            };
            if (item.menuParentId != undefined && item.menuParentId != null){
                menu.menuParentId = `${item.menuParentId}`;
            }
            if (item.breadcrumbParentId != undefined && item.breadcrumbParentId != null){
                menu.breadcrumbParentId = `${item.breadcrumbParentId}`;
            }
            items.push(menu)
        })
        newState = Object.assign({},state,{routeList:items});
        break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
