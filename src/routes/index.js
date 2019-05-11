import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Intro from '../screens/intro/Intro';
import Login from '../screens/login/Login';

const routes = createStackNavigator(
  {
	  Intro,
    Login
  },
  {
    initialRouteName: 'Intro'
  }
);

export default createAppContainer(routes);