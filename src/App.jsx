import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Payment from "./Payment";
import SuccessPage from "./pages/SuccessPage";
import LandingPage from "./pages/LandingPage";

function App() {


  return (
    <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path="/standard-payment" component={Payment}/>
        <Route path="/successful" component={SuccessPage}/>
    </Switch>
  )
}

export default App
