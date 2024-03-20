import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import MqttPublisher from './components/MqttPublisher'

function App() {
  const [count, setCount] = useState(0)

  const mqttTopic = "hello/world"; // Example topic
  const mqttMessage = "Hello World!"; // Example message

  return (
    <>
      <div>test publisher</div>
      <p>Sending "{mqttMessage}" message to topic "{mqttTopic}"...</p>
      <MqttPublisher topic={mqttTopic} message={mqttMessage}/>
    </>
  )
}

export default App
