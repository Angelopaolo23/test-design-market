import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui';
import { AppProvider } from './context';
import { AppLayout } from './components/layout';
import { Landing } from './pages/Landing';
import { ArtworkDetail } from './pages/ArtworkDetail';
import { Settings } from './pages/Settings';

/**
 * App - Componente raíz de la aplicación
 *
 * Estructura:
 * - ToastProvider: Sistema de notificaciones
 * - BrowserRouter: Enrutamiento
 * - AppProvider: Estado global (paneles, carrito, usuario)
 * - AppLayout: Background y paneles globales
 */
function App() {
  return (
    <ToastProvider position="top-right">
      <BrowserRouter>
        <AppProvider>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/artwork/:id" element={<ArtworkDetail />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </AppLayout>
        </AppProvider>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
