import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/testt';
import CustomPage from './pages/CustomPage';
import CollectionsPage from './pages/CollectionsPage';
import CategoryPage from './pages/CategoryPage';
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
              <Route path="product/:slug" element={<ProductDetailPage />} />
              <Route path="custom" element={<CustomPage />} />
              <Route path="collections" element={<CollectionsPage />} />
              <Route path="collections/:category" element={<CategoryPage />} />
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
