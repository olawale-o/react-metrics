import { Switch, Route } from 'react-router-dom';
import Main from './components/Main';

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/" component={Main} exact />
    </Switch>
  </div>
);

export default App;
