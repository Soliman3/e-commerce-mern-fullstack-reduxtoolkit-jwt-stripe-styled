import styled from "styled-components";

// import React Router Dom for Routing...
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import required Pages & main components...
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import UserList from "./pages/UserList";
import UserSinglePage from "./pages/UserSinglePage";
import NewUser from "./pages/NewUser";
import ProductList from "./pages/ProductList";
import ProductSinglePage from "./pages/ProductSinglePage";
import NewProduct from "./pages/NewProduct";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import Page404 from "./pages/Page404";

// Styling..
const Container = styled.div``;
const Main = styled.div`
  display: flex;
`;
function App() {
  const user = useSelector((state) => state.user?.currentUser?.isAdmin);
  return (
    <Container>
      <BrowserRouter>
        <TopBar />
        <Main>
          {user && <SideBar />}

          <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route exact path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:id" element={<UserSinglePage />} />
              <Route path="/newuser" element={<NewUser />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductSinglePage />} />
              <Route path="/newproduct" element={<NewProduct />} />
              <Route path="/*" element={<Page404/>}/>
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Main>
      </BrowserRouter>
    </Container>
  );
}

export default App;
