import { Routes, Route } from 'react-router-dom';
import Detail from './components/Detail';
import Main from './components/Main';

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/:id" element={<Detail />} />
    </Routes>
  </div>
);

export default App;
