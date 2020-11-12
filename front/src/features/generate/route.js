// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  MysqltablePage,
} from './';

export default {
  path: 'generate',
  name: 'Generate',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: MysqltablePage, isIndex: true },
  ],
};
