import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import { colors, fonts } from '../components/styles';

import Intro from '../screens/intro/Intro';
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import Dashboard from '../screens/dashboard/Dashboard';
import Pesan from '../screens/pesan/Pesan';
import Histori from '../screens/histori/Histori';
import Lainnya from '../screens/lainnya/Lainnya';
import AuthLoading from '../screens/autoloading/AuthLoading';

const DashboardNavigator = createBottomTabNavigator(
  {
    Dashboard,
    Pesan,
    Histori,
    Lainnya
  },
  {
    initialRouteName: 'Dashboard',
    navigationOptions: {
      header: null
    },
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.lightgrey,
      style: {        
        height: 60,        
        paddingVertical: 5,        
        backgroundColor: colors.white,
        borderWidth: 0,
        borderTopColor: colors.transparent   
      },      
      labelStyle: {        
        fontSize: 13,        
        fontFamily: fonts.regular     
      } 
    },
  }
);

const WelcomeNavigator = createStackNavigator(
  {
	  Intro,
    Login,
    Register,
  },
  {
    initialRouteName: 'Intro',
    navigationOptions: {
      headerMode: 'screen'
    }
  }
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    Dashboard: DashboardNavigator,
    Welcome: WelcomeNavigator,
  },
  {
    initialRouteName: 'AuthLoading'
  }
));