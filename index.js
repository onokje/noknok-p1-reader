require('dotenv').config();
const P1Reader = require('p1-reader');
const p1Reader = new P1Reader({
    port: '/dev/ttyUSB1',
    baudRate: 115200,
    parity: 'none',
    dataBits: 8,
    stopBits: 1,
    debug: true
});

const mqtt = require('mqtt');
const client  = mqtt.connect(process.env.MQTT_HOST, {username: process.env.MQTT_USERNAME, password: process.env.MQTT_PASSWORD});

client.on('connect', function () {
    console.log('Mqtt connected successfully.');
});

p1Reader.on('reading', function(data) {
    client.publish('data/p1', JSON.stringify(data));
});

p1Reader.on('error', function(err) {
    console.log('Error while reading: ' + err);
});