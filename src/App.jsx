import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-raios-secondary text-raios-text-high p-8">
      {/* Header con glassmorphism */}
      <header className="bg-raios-secondary/90 backdrop-blur-sm p-4 mb-8 rounded">
        <h1 className="text-3xl font-mono text-raios-text-high">
          ⚡ RAIOS Marketplace
        </h1>
        <p className="text-base font-sans text-raios-text-support mt-2">
          Tailwind CSS instalado correctamente
        </p>
      </header>

      {/* Test de componentes */}
      <div className="space-y-8">
        {/* Botón Primario */}
        <div>
          <h2 className="text-xl font-mono mb-4">Botón Primario (CTA)</h2>
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-raios-primary text-raios-text-high px-4 py-2 font-sans font-semibold hover:bg-raios-text-high hover:text-raios-primary transition-colors"
          >
            Contador: {count}
          </button>
        </div>

        {/* Botón Secundario */}
        <div>
          <h2 className="text-xl font-mono mb-4">Botón Secundario</h2>
          <button 
            className="border-2 border-raios-primary text-raios-primary px-4 py-2 font-sans font-semibold bg-transparent hover:bg-raios-primary hover:text-raios-text-high transition-colors"
          >
            Explorar Arte
          </button>
        </div>

        {/* Card de prueba */}
        <div>
          <h2 className="text-xl font-mono mb-4">Art Card (Ejemplo)</h2>
          <div className="bg-raios-secondary border border-raios-text-support/20 p-4 rounded">
            <h3 className="text-lg font-mono text-raios-text-high mb-2">
              Obra de Arte Digital
            </h3>
            <p className="text-base font-sans text-raios-text-support mb-4">
              Descripción de la obra usando Montserrat para legibilidad.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-sans text-raios-text-support">
                Artista: John Doe
              </span>
              <span className="text-lg font-mono text-raios-tertiary">
                $1,200
              </span>
            </div>
          </div>
        </div>

        {/* Paleta de colores */}
        <div>
          <h2 className="text-xl font-mono mb-4">Paleta de Colores RAIOS</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-raios-primary p-4 rounded">
              <p className="font-mono">Primary</p>
              <p className="text-xs font-sans">#4A1FFF</p>
            </div>
            <div className="bg-raios-secondary border border-raios-text-support p-4 rounded">
              <p className="font-mono">Secondary</p>
              <p className="text-xs font-sans">#0A0218</p>
            </div>
            <div className="bg-raios-tertiary p-4 rounded">
              <p className="font-mono">Tertiary</p>
              <p className="text-xs font-sans">#8E5CFF</p>
            </div>
            <div className="bg-raios-text-high text-raios-secondary p-4 rounded">
              <p className="font-mono">Text High</p>
              <p className="text-xs font-sans">#FFFFFF</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

