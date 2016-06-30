import './map.html';

import {Session} from 'meteor/session';

import Event from '../../utils/event';
// import {ReactiveDict} from 'meteor/reactive-dict';
let listener;

class GoogleMap {
  constructor(element, opts={}) {
    this.instance = new google.maps.Map(element, opts)
  }

  createMarker(opts={}) {
    const { lat, lng } = opts;
    return new google.maps.Marker({
      map: this.instance,
      position: {lat, lng},
      title: opts.title
    });
  }

  setCenter(pos) {
    const { lat, lng} = pos;
    this.instance.panTo({lat, lng});
  }

  destroy() {
    google.maps.event.clearInstanceListeners(this.instance);
  }
}

// Template.map.onCreated(function bodyOnCreated() {
//   this.state = new ReactiveDict();
// });

Template.map.onRendered(function () {
  this.map = new GoogleMap(document.getElementById('gmap'), {
    center: { lat: 37.7719, lng: -122.4052 },
    zoom: 8
  });

  const { places } = this.data;
  if (places) {
    places.forEach(place => {
      const {lat, lng} = place.address
      let marker = this.map.createMarker({
        title: place.name,
        lat,
        lng
      });

      marker.addListener('click', function (event) {
        console.log(this.position);
        const {lat, lng} = this.position;
        this.map.setCenter({lat: lat(), lng: lng()})
      })
    })
  }

  console.log(this.map);
  Event.on('company.cell-clicked', listener = function (company) {
    this.map.centerMap(company.address)
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

