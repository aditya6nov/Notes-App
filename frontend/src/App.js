import './App.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import LandingPage from './screens/landingPages/landingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CreateNote from './screens/CreateNote/createNote';
import SingleNote from './screens/CreateNote/singleNote';
import { useState } from 'react';
import ProfileScreen from './screens/ProfileScreen/profileScreen';

function App() {
  const [search,setSearch] = useState("");
  return (
    <BrowserRouter>
      {/* <h1>hello man how is you</h1> */}
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/createnote" element={<CreateNote />} />
          <Route path="/note/:id" element={<SingleNote />} />
          <Route path="/mynotes" element={<MyNotes search={search} />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
