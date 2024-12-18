import { useState } from 'react'
import './App.css'
import Layout from './component/layers/Layout.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout></Layout>
    </>
  )
}

export default App
