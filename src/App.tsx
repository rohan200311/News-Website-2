/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Article from "./pages/Article";
import Category from "./pages/Category";
import Trending from "./pages/Trending";
import Subscribe from "./pages/Subscribe";
import About from "./pages/About";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="article/:id" element={<Article />} />
          <Route path="category/:name" element={<Category />} />
          <Route path="trending" element={<Trending />} />
          <Route path="subscribe" element={<Subscribe />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

