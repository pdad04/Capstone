import { StackNavigator } from 'react-navigation'
import SearchWatch from '../Containers/SearchWatch'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  SearchWatch: { screen: SearchWatch },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'SearchWatch',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
