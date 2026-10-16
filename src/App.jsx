import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Catalog from './pages/Catalog';
import PosterDetail from './pages/PosterDetail';
import Cart from './pages/Cart';

export default function App() {
  return (
    <>
      {/* The navbar is outside Routes so it shows on every page */}
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Catalog />} />
          {/* :id is the movie id, e.g. /poster/289 */}
          <Route path="/poster/:id" element={<PosterDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </>
  );
}
