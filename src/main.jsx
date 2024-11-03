import React from 'react'
import ReactDOM from 'react-dom/client'
//Importamos el ContenedorX
import ContenedorX from './componentes/Contenedor/Contenedor.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*Aca llamamos al componente del ContenedorX*/}
    <ContenedorX />
  </React.StrictMode>,
)
