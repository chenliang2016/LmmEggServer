// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  AddListPage,
} from './';

export default {
  path: 'system',
  name: 'System',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: 'addList', name: 'Add list page', component: AddListPage },
  ],
};
