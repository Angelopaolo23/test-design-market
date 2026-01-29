import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui';
import { Landing } from './pages/Landing';
import { ArtworkDetail } from './pages/ArtworkDetail';
import { Settings } from './pages/Settings';

function App() {
  return (
    <ToastProvider position="top-right">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/artwork/:id" element={<ArtworkDetail />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
