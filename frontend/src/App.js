import Main from './Components/Main/Main'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {ConfigureStore} from './Redux/configureStore'

const store = ConfigureStore();

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}/>
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
          <Route path="main" element={<Main />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
