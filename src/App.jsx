import './App.css'
import HomeBg from './Backgroud/HomeBg';
import CreateOrJoinRoom from './Components/CreateOrJoinRoom';

function App() {
  return (
    <>
      <div className="relative z-10 h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 flex items-center justify-center">
        {/* Blurred Background Elements */}
          <HomeBg/>
       

        {/* Foreground Content */}
        <div className="text-[#281950] w-[25%] h-[50%] bg-white shadow-2xl rounded-xl flex items-center justify-center  flex-col">
            <CreateOrJoinRoom/>
        </div>
      </div>
    </>
  );
}

export default App;
