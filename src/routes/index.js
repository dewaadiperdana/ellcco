import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { colors, fonts, text } from "../components/styles";

import Intro from "../screens/intro/Intro";
import LoginPelanggan from "../screens/login/LoginPelanggan";
import LoginTukang from "../screens/login/LoginTukang";
import RegisterPelanggan from "../screens/register/RegisterPelanggan";
import RegisterTukang from "../screens/register/RegisterTukang";
import DashboardPelanggan from "../screens/dashboard/DashboardPelanggan";
import DashboardTukang from "../screens/dashboard/DashboardTukang";
import Jasa from "../screens/jasa/Jasa";
import Pesan from "../screens/pesan/Pesan";
import Histori from "../screens/histori/Histori";
import Lainnya from "../screens/lainnya/Lainnya";
import AuthLoading from "../screens/autoloading/AuthLoading";
import FormPesan from "../screens/pesan/FormPesan";
import Notifikasi from "../screens/notifikasi/Notifikasi";
import DetailNotifikasi from "../screens/notifikasi/DetailNotifikasi";
import DetailPesanan from "../screens/pesan/DetailPesanan";

const PesanNavigator = createStackNavigator(
  {
    Pesan,
    FormPesan
  },
  {
    initialRouteName: "Pesan"
  }
);

const WelcomeNavigator = createStackNavigator(
  {
    Intro,
    LoginPelanggan,
    LoginTukang,
    RegisterPelanggan,
    RegisterTukang
  },
  {
    initialRouteName: "Intro",
    navigationOptions: {
      headerMode: "screen"
    }
  }
);

const DashboardPelangganTabNavigator = createBottomTabNavigator(
  {
    DashboardPelanggan,
    Pesan: {
      screen: PesanNavigator,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          return (
            <FontAwesome5
              name="shopping-bag"
              size={20}
              focused={focused}
              color={tintColor}
            />
          );
        }
      }
    },
    Histori,
    Lainnya
  },
  {
    initialRouteName: "DashboardPelanggan",
    animationEnabled: true,
    swipeEnabled: true,
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.lightgrey,
      style: {
        height: 60,
        paddingVertical: 5,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderTopColor: colors.extraLightGrey,
        borderBottomColor: colors.transparent
      },
      labelStyle: {
        fontSize: 11,
        fontFamily: fonts.regular
      }
    }
  }
);

const DashboardPelangganStackNavigator = createStackNavigator(
  {
    DashboardPelanggan: DashboardPelangganTabNavigator,
    FormPesan,
    DetailPesanan,
    Notifikasi,
    DetailNotifikasi
  },
  {
    initialRouteName: "DashboardPelanggan"
  }
);

const DashboardTukangTabNavigator = createBottomTabNavigator(
  {
    DashboardTukang,
    Jasa,
    Histori,
    Lainnya
  },
  {
    initialRouteName: "DashboardTukang",
    animationEnabled: true,
    swipeEnabled: true,
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.lightgrey,
      style: {
        height: 60,
        paddingVertical: 5,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderTopColor: colors.extraLightGrey,
        borderBottomColor: colors.transparent
      },
      labelStyle: {
        fontSize: 11,
        fontFamily: fonts.regular
      }
    }
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      DashboardPelanggan: DashboardPelangganStackNavigator,
      DashboardTukang: DashboardTukangTabNavigator,
      Welcome: WelcomeNavigator
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);