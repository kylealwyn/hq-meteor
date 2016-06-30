import './map.html';

import {Session} from 'meteor/session';

import Event from '../../utils/event';
import Map from '../../utils/map';
// import {ReactiveDict} from 'meteor/reactive-dict';
let listener;

// Template.map.onCreated(function bodyOnCreated() {
//   this.state = new ReactiveDict();
// });

Template.map.onRendered(function () {
  const map = this.map = new Map(document.getElementById('gmap'), {
    center: { lat: 37.7719, lng: -122.4052 },
    zoom: 8
  });

  const { places } = this.data;
  if (places) {
    places.forEach(place => {
      const {lat, lng} = place.address;
      const marker = this.map.createMarker({
        title: place.name,
        position: {lat, lng},
        icon: {
          url: `/images/${place.logo}`,
          origin: new google.maps.Point(0, 0),
          scaledSize: new google.maps.Size(30, 30)
        }
      });

      marker.addListener('click', function (event) {
        const {lat, lng} = this.position;

        map.setCenter({lat: lat(), lng: lng()});
        map.openInfoWindow(this, `<h3>${place.name}<h3>`)

        Event.emit('marker.clicked', place);
      })
    })
  }

  Event.on('company.cell-clicked', listener = (company) => {
    this.map.setCenter(company.address)
  })
})

Template.map.onDestroyed(function () {
  Event.off('company.cell-clicked', listener)
})

Template.map.helpers({
  company() {
    return Session.get('currentCompany')
  }
})

