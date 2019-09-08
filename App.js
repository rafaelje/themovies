import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './src/screens/HomeScreen'
import DetailScreen from './src/screens/DetailScreen'
import FullListScreen from './src/screens/FullListScreen'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faStar, faClock, faCalendar, faList, faHeart, faShare, faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronLeft, faStar, faClock, faCalendar, faList, faHeart, faShare, faUserCircle, faSearch)

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