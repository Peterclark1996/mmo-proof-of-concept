import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import App from './routes/App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const rootElement = document.getElementById('root')
render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
)