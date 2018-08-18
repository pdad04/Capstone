import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  imageStyle: {
    width: 227, 
    height: 227, 
    marginTop: 10, 
    marginLeft: 'auto', 
    marginRight: 'auto'
  },
  buttonStyle: {
    padding: 5,
    margin: 5
  },
  buttonText: {
    color: 'white'
  },
  movieDescription: {
    lineHeight: 20.5,
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10
  }
})
