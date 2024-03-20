import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const MqttSubscriber = ({ topic }) => {
  const [messages, setMessages] = useState([]); // State to store received messages

  useEffect(() => {
    if (!topic) {
      console.log("MQTT Subscriber: Topic is missing.");
      return;
    }

    const options = {
      connectTimeout: 4000, // milliseconds
      // For MQTT broker authentication (if needed)
      // username: 'yourUsername',
      // password: 'yourPassword',
    };

    const client = mqtt.connect('ws://localhost:9001', options);

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe(topic, {}, (error) => {
        if (error) {
          console.error('Subscribe error:', error);
        } else {
          console.log(`Subscribed to topic "${topic}"`);
        }
      });
    });

    client.on('message', (receivedTopic, message) => {
      if (topic === receivedTopic) {
        console.log(`Message received: ${message.toString()}`);
        // Update state with the new message
        setMessages(prevMessages => [...prevMessages, message.toString()]);
      }
    });

    return () => {
      if (client) {
        client.unsubscribe(topic);
        client.end();
      }
    };
  }, [topic]);

  // Render the received messages
  return (
    <div>
      <h2>Messages on "{topic}"</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default MqttSubscriber;
