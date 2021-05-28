import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Payment from "./Payment";
import SuccessPage from "./SuccessPage";
import PayWithCard from "./PayWithCard";

function App() {


  return (
    <Switch>
        <Route exact path="/" component={Payment}/>
        <Route path="/pay" component={PayWithCard}/>
        <Route path="/successful" component={SuccessPage}/>
    </Switch>
  )
}

export default App
