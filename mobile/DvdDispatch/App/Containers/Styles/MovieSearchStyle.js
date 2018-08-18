import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  progressIndicator:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textNote: {
    marginTop: 5,
    fontSize: 12.5
  },
  background: {
    backgroundColor:'#efefef'
  }
})
