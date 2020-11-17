// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  MenuPage,
  RolePage
} from './';

export default {
  path: 'role',
  name: 'Role',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: 'menu', name: 'menu page', component: MenuPage, isIndex: true },
    { path: 'role', name: 'menu page', component: RolePage, isIndex: true },
  ],
};
