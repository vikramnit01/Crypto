import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Navbar from './Component/layout/Navbar'
import Index from './Component/layout/Index'
import CoinPage from './Component/coin/CoinPage'
function App() {
  return (
    <Router>
     <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Index}></Route>
        <Route exact path="/coin/:id" component={CoinPage}></Route>
      </Switch>
    </>
    </Router>
    
  );
}

export default App;
