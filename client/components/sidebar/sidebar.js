import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

// import companies from '../../data/companies';
import Event from '../../utils/event';

import './sidebar.html';

Template.sidebar.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});


Template.sidebar.events({
  'click .company-cell'(event, template) {
    Session.set('currentCompany', this);
    Event.emit('company.cell-clicked', this);
  },
  'keypress #company-search-input, blur #company-search-input, focus #company-search-input'(event, instance) {
    instance.state.set('filter', event.target.value);
  }
})

Template.sidebar.helpers({
  companies() {
    const { state } = Template.instance(),
          filter = state.get('filter');

    if (filter) {
      return this.companies.filter(company => company.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
    } else {
      return this.companies;
    }
  }
})