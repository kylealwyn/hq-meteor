export default class Map {
  constructor(element, opts={}) {
    this.instance = new google.maps.Map(element, opts);
    this.infoWindow=  new google.maps.InfoWindow();
    console.log(this);
  }

  createMarker(opts={}) {
    const { lat, lng } = opts;
    return new google.maps.Marker(_.extend(opts, {
      map: this.instance,
    }));
  }

  setCenter(pos) {
    const { lat, lng } = pos;
    this.instance.panTo({lat, lng});
  }

  openInfoWindow(marker, content) {
    this.infoWindow.setContent(content);
    this.infoWindow.open(this.instance, marker);
  }

  destroy() {
    google.maps.event.clearInstanceListeners(this.instance);
  }
}