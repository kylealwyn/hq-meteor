import {Template} from 'meteor/templating';

import './content.html';

import companies from '../../data/companies';

Template.content.helpers({
  companies
})