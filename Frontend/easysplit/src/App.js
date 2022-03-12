import Home from './Components/Home'
import Login from './Components/Login';
import Register from './Components/Register'
import { UserApi } from './controllers/apis/user.api';

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <Login />
      {/* <Register /> */}
    </div>
  );
}

export default App;
