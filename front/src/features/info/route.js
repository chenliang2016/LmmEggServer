// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  InfoPage,
  InfoCategoryPage,
  EditPage,
} from './';

export default {
  path: 'info',
  name: 'Info',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: 'infoCategory', name: 'Default page', component: InfoCategoryPage, isIndex: true },
    { path: 'list', name: 'Default page', component: InfoPage, isIndex: true },
    { path: 'edit', name: 'Edit page', component: EditPage },
  ],
};
