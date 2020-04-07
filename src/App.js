import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './components/Home';
// import asyncComponent from './hoc/asynComponent/asyncComponent';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
  
    }
  }

  componentDidMount() {
    this.retrievePromise()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
      this.registerNewUser();
    });
  }

  retrievePromise = () => window.googleyolo.retrieve({
    supportedAuthMethods: [
      "https://accounts.google.com"
    ],
    supportedIdTokenProviders: [
      {
        uri: "https://accounts.google.com",
        // Replace with your client Id
        clientId: '88692511407-kdn5qiccmfck0mruughatefrrcirunr0.apps.googleusercontent.com'
      }
    ]
  });

  registerNewUser = () => {
    window.googleyolo.hint({
      supportedAuthMethods: [
       "https://accounts.google.com"
      ],
      supportedIdTokenProviders: [{
        uri: "https://accounts.google.com",
        // Replace with your client Id
        clientId: '88692511407-kdn5qiccmfck0mruughatefrrcirunr0.apps.googleusercontent.com'
      }],
      context: "signUp"
    }).then((credential) => {
      console.log(credential);
      /* hit backend api and API TOKEN here */
      /* Also save basic details that we get here */
    }, (error)=> {
      console.log("Error occurred: ", error.type);
    });
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div>
        {routes}
      </div>
    );
  }
}

export default App;