import {createBrowserRouter, createRoutesFromElements ,Route} from 'react-router-dom';
import GameLobby from './page/GameLobby.jsx';
import MainLayout from './MainLayout/MainLayout.jsx';
import Home from './page/Home.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout/>}>
             <Route index element={<Home />} />
             <Route path='gameLobby' element={<GameLobby />} />
        </Route>
    )
)

export default router ;