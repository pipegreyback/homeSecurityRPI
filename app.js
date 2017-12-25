'use strict';

var Cylon = require('cylon');

Cylon.robot({
  name: 'rosie',

  events: ['turned_on', 'turned_off', 'toggle', 'abrir', 'cerrar'],

  connections: {
    raspi: { adaptor: 'raspi' }
  },

  devices: {
    white: { driver: 'led', pin: 7 },
    red: {driver:'led', pin: 16},
    green: {driver: 'led', pin: 12},
    servo: {driver: 'servo', pin: 13}
  },
  commands: function() {
    return {
      turn_on: this.turnOn,
      turn_off: this.turnOff,
      toggle: this.toggle,
	abrir: this.abrir,
	cerrar: this.cerrar
    };
  },

  toggle: function() {
    this.led.toggle();
    if (this.led.isOn()) {
      this.emit('turned_on', { data: 'pass some data to the listener'});
    } else {
      this.emit('turned_off', { data: 'pass some data to the listener'});
    }
  },

  turnOn: function() {
    this.led.turnOn();
    this.emit('turned_on', { data: 'pass some data to the listener'});
  },

  turnOff: function() {
    this.led.turnOff();
    this.emit('turned_off', { data: 'pass some data to the listener'});
  },

  abrir: function(){
    this.servo.angle(90);
  },

  cerrar: function(){
    this.servo.angle(45);
  },

  work: function(my) {
	my.white.toggle();
	my.red.toggle();
	my.green.toggle();
	my.servo.angle(90);
    // Add your robot code here,
    // for this example with sockets
    // we are going to be interacting
    // with the robot using the code in
    // ./blink-client.html.
  }
});

// ensure you install the API plugin first:
// $ npm install cylon-api-socket-io
Cylon.api(
  'socketio', {
  host: '0.0.0.0',
  port: '3000'
});

Cylon.start();
