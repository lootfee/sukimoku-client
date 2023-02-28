import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ApiProvider from "./contexts/ApiProvider";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import ExplorePage from "./pages/ExplorePage";
import LoginPage from "./pages/LoginPage";
import SubscriptionsPage from "./pages/SubscriptionsPage";
import UserPage from "./pages/UserPage";
import RegistrationPage from "./pages/RegistrationPage";
import EditUserPage from "./pages/EditUserPage";
import FlashProvider from "./contexts/FlashProvider";
import UserProvider from "./contexts/UserProvider";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";


function App() {

  return (
    <Container fluid className="App">
      <BrowserRouter>
        <FlashProvider>
          <ApiProvider>
            <UserProvider >
              <Header />
              <Routes>
                <Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><RegistrationPage/></PublicRoute>} />
                <Route path="/explore" element={<ExplorePage/>} />
                <Route path="*" element={<Navigate to="/explore" />} />
                <Route path="/" element={<Navigate to="/explore" />} end/>

                <Route path="/subscriptions" element={<PrivateRoute><SubscriptionsPage/></PrivateRoute>} />
                <Route path="/user/:userId" element={<PrivateRoute><UserPage /></PrivateRoute>} />
                <Route path="/edit" element={<PrivateRoute><EditUserPage /></PrivateRoute>} />

                
              </Routes>
            </UserProvider>
          </ApiProvider>
        </FlashProvider>
      </BrowserRouter>
    </Container>
  );
}

export default App;
