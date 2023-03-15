import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../src/screens/Home/Home'
import PostCollection from '../src/screens/PostCollection/PostCollection'
import DeleteCollection from '../src/screens/DeleteCollection/DeleteCollection'
import CreateCollection from "../src/screens/CreateCollection/CreateCollection";
import ViewCollection from "./screens/ViewCollection/ViewCollection";
import ViewAllCollections from "./screens/ViewAllCollections/ViewAllCollections";
import Example from "./screens/CrudCollection";
import CrudCollections from "./screens/CrudCollections/CrudCollections";
import { Provider } from 'react-redux'
import Store from "./redux/Store";
function App() {
  return (
    <Provider store={Store}>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />}> </Route>
        <Route path="create" element={<CreateCollection />}> </Route>
        <Route path="crud" element={<CrudCollections />}> </Route>
        <Route path="post" element={<PostCollection />} > </Route>
        <Route path="delete" element={<DeleteCollection />} > </Route>
        <Route path="view" element={<ViewCollection />} > </Route>
        <Route path="viewall" element={<ViewAllCollections />} > </Route>
        <Route path="example" element={<Example />} > </Route>
    </Routes>
  </BrowserRouter>
  </Provider>
  );
}

export default App;
