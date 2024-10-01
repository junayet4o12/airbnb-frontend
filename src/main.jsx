import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { router } from './Routes/Routes.jsx';
import store from './Redux/store.jsx';
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <Toaster />
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>,
)
