import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../src/screens/Home/Home'
import PostCollection from '../src/screens/PostCollection/PostCollection'
import DeleteCollection from '../src/screens/DeleteCollection/DeleteCollection'
import CreateCollection from "../src/screens/CreateCollection/CreateCollection";
import ViewCollection from "./screens/ViewCollection/ViewCollection";
import ViewAllCollections from "./screens/ViewAllCollections/ViewAllCollections";
function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />}> </Route>
        <Route path="create" element={<CreateCollection />}> </Route>
        <Route path="post" element={<PostCollection />} > </Route>
        <Route path="delete" element={<DeleteCollection />} > </Route>
        <Route path="view" element={<ViewCollection />} > </Route>
        <Route path="viewall" element={<ViewAllCollections />} > </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
