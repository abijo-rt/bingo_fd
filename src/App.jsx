import './App.css'
import './index.css'
import HomeBg from './Backgroud/HomeBg';

import PlayerBoard from './Components/PlayerBoard';

import CreateRoom from './Components/CreateRoom';
import Header from './Components/Header';
import JoinRoom from './Components/JoinRoom';
import router from './Routes';
import Home from './page/Home.jsx';
import MainLayout from './MainLayout/MainLayout.jsx';
import { RouterProvider } from 'react-router-dom';

function App() {
  return (
    <>
      <RouterProvider router = {router}/>
    </>
  );
}

export default App;
