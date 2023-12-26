
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ProductProvider } from "./context/ProductContext";
import { ShopContextProvider } from "./context/ShopContext";

import { Index } from "./page/Index";
import { Item } from "./component/Item";
import { Cart } from "./page/Cart";
import { Account } from "./page/Account";
import { Navbar } from "./component/Navbar";
import { Success } from "./page/Success";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <ProductProvider>
          <Router>
            <Navbar/>
            <Routes>
              <Route path='/' element={<Index/>}></Route>
              <Route path='/product' element={<undefined/>}></Route>
              <Route path='/product/:name' element={<Item/>}></Route>
              <Route path='/cart' element={<Cart/>}></Route>
              <Route path="/account" element={<Account/>}></Route>
              <Route path="/success" element={<Success/>}></Route>
            </Routes>
          </Router>
        </ProductProvider>
      </ShopContextProvider>
    </div>
  );
}

export default App;
