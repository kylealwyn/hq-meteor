import { Template } from 'meteor/templating';

import './nav.html';

Template.nav.helpers({
  tasks: [
    { text: 'This is task 1' },
    { text: 'This is task 2' },
    { text: 'This is task 3' },
  ],
});