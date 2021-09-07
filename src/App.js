import { Switch, Route } from 'react-router-dom';
import Detail from './components/Detail';
import Main from './components/Main';

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/" component={Main} exact />
      <Route path="/:id" component={Detail} exact />
    </Switch>
  </div>
);

export default App;
