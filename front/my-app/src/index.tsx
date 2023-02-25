import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { Outlet, Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Test from './components/Test';
import { Login } from './components/Login';
import Profile from './components/Profile';
import ProductUp from './components/ProductUp';
import ProductList from './components/ProductList';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} >
                    <Route path="/test" element={<Test/>} />
                    <Route path="/productUp" element={<ProductUp/>} />
                    <Route path="/productList" element={<ProductList/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/profile" element={<Profile/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

