// Punto de entrada de la aplicación React
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Obtener el elemento root del HTML
const root = ReactDOM.createRoot(document.getElementById('root')!)

// Renderizar la aplicación
root.render(<App />)
