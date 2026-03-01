import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CustomPage from './pages/CustomPage';
import CollectionsPage from './pages/CollectionsPage';
import WishlistPage from './pages/WishlistPage';
import CartPage from './pages/CartPage';
import { ShopProvider } from './context/ShopContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <ShopProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="product/:slug" element={<ProductPage />} />
              <Route path="custom" element={<CustomPage />} />
              <Route path="collections" element={<CollectionsPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ShopProvider>
    </ToastProvider>
  );
}

export default App;
