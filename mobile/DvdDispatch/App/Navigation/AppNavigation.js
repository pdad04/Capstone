import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MovieDetails from '../Containers/MovieDetails'
import MovieWatchList from '../Containers/MovieWatchList'
import MovieSearch from '../Containers/MovieSearch'
import SearchWatch from '../Containers/SearchWatch'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const SearchStack = StackNavigator({
  Search: { screen: MovieSearch },
  Details: { screen: MovieDetails }
}, {
  headerMode: 'screen'
})

const PrimaryNav = TabNavigator({
  Search: { screen: SearchStack },
  Watch: { screen: MovieWatchList }
}, 
{
  initialRouteName: 'Search',
  lazy: true,
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Search') {
        iconName = `ios-search${focused ? '' : '-outline'}`;
      } else if (routeName === 'Watch') {
        iconName = `ios-eye${focused ? '' : '-outline'}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  })
})

export default PrimaryNav
