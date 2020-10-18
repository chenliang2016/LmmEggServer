// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  AdminPage,
  DeptPage,
} from './';

export default {
  path: 'admin',
  name: 'Admin',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: AdminPage, isIndex: true },
    { path: 'dept', name: '部门', component: DeptPage, isIndex: true },
  ],
};
