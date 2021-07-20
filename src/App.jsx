import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Payment from "./Payment";
import SuccessPage from "./pages/SuccessPage";

function App() {


  return (
    <Switch>
        <Route exact path="/" component={Payment}/>
        <Route path="/successful" component={SuccessPage}/>
    </Switch>
  )
}

export default App
