// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  COMMON_CHANGE_ROLE_LIST,
} from './constants';

export function changeRoleList(routeList) {
  return {
    type: COMMON_CHANGE_ROLE_LIST,
    data:routeList,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_CHANGE_ROLE_LIST:

        let items = [];
        action.data.map(item => {
            let menu = {
                id: `${item.id}`,
                icon:  `${item.icon}`,
                name: `${item.name}`,
                route: `${item.route}`,
            };
            if (item.menuParentId != undefined && item.menuParentId != null){
                menu.menuParentId = `${item.menuParentId}`;
            }
            if (item.breadcrumbParentId != undefined && item.breadcrumbParentId != null){
                menu.breadcrumbParentId = `${item.breadcrumbParentId}`;
            }
            items.push(menu)
        })
        console.log(items)

      return {
        ...state,
        routeList:items
      };

    default:
      return state;
  }
}
