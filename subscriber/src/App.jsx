import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// components
import MqttSubscriber from './components/MqttSubscriber'

function App() {
  const [count, setCount] = useState(0)
  const mqttTopic = "hello/world";

  return (
    <>
      <div>test subscriber</div>
      <p>Listening to topic "{mqttTopic}" for messages...</p>
      <MqttSubscriber topic={mqttTopic} />
    </>
  )
}

export default App
