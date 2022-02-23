import { useRoutes } from 'react-router-dom';
import './App.scss';

import router from './commons/routes';

function App() {
  return useRoutes(router);
}

export default App;
