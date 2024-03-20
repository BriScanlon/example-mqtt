import React, { useEffect } from 'react';
import mqtt from 'mqtt';

const MqttPublisher = ({ topic, message }) => {
  useEffect(() => {
    if (!topic || !message) {
      console.log("MQTT Publisher: Topic or message is missing.");
      return;
    }

    // MQTT Broker Connection Options
    const options = {
      connectTimeout: 4000, // milliseconds
      // For MQTT broker authentication (if needed)
      // username: 'yourUsername',
      // password: 'yourPassword',
    };

    // Connect to the MQTT broker (update the URL to match your MQTT broker's WebSocket URL)
    const client = mqtt.connect('ws://localhost:9001', options);

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.publish(topic, message, {}, (error) => {
        if (error) {
          console.error('Publish error:', error);
        } else {
          console.log(`Message "${message}" published to topic "${topic}"`);
        }
      });
    });

    return () => {
      client.end();
    };
  }, [topic, message]); // Reconnect on topic or message change

  // This component does not render anything
  return null;
};

export default MqttPublisher;
