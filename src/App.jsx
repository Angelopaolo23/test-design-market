import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { ArtworkDetail } from './pages/ArtworkDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/artwork/:id" element={<ArtworkDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
