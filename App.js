import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './src/screens/HomeScreen'
import DetailScreen from './src/screens/DetailScreen'
import FullListScreen from './src/screens/FullListScreen'

const AppNavigator = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
  },
  FullListScreen: {
    screen: FullListScreen
  },
  DetailsScreen: {
    screen: DetailScreen
  }
},
{
  initialRouteName: "HomeScreen"
});

export default createAppContainer(AppNavigator);