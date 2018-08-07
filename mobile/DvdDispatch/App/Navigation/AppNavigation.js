import { StackNavigator, TabNavigator } from 'react-navigation'
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
}, {
  initialRouteName: 'Search',
  lazy: true,
})

export default PrimaryNav
