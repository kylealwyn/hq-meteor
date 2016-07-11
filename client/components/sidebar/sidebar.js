import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

// import companies from '../../data/companies';
import Event from '../../utils/event';

import './sidebar.html';

Template.sidebar.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});


Template.sidebar.events({
  'click .company-cell-address'(event, template) {
    Session.set('currentCompany', this);
    Event.emit('company.cell-clicked', this);
  },
  'submit .search-form'(event) {
    event.preventDefault();
  },
  'keyup #search-input, blur #search-input, focus #search-input, input #search-input, search #search-input'(event, instance) {
    instance.state.set('filter', event.target.value);
  }
})

Template.sidebar.helpers({
  companies() {
    const { state } = Template.instance(),
          filter = state.get('filter');

    let sortedCompanies = _.sortBy(this.companies, 'name');
    if (filter) {
      return sortedCompanies.filter(company => company.name.toLowerCase().includes(filter.toLowerCase()))
    } else {
      return sortedCompanies;
    }
  }
})
