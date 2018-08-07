import React, { Component } from 'react'
import { ScrollView, Text, Image } from 'react-native'
import { Container, Content, Button } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MovieDetailsStyle'

class MovieDetails extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  static navigationOptions = ({navigation}) => ({
    headerTitle: `${navigation.state.params.movie.name}`
  })

  addToWatchList(entry){
    // this.setState(prevState => ({ watchList: [...prevState.watchList, entry]}))
    window.watchList.push(entry);
    // this.props.addMovie(entry);
  }

  render () {
    let aUrl = this.props.navigation.state.params.movie.artworkUrl;
    let aNew = aUrl.replace('100x100bb.jpg','227x227bb.jpg');
    return (
      <Container>
        <Content>
          <Image
            style={{width: 227, height: 227, marginTop: 10, marginLeft: 'auto', marginRight: 'auto'}}
            source={{uri: aNew}}
            resizeMode='contain'
          />
          <Button block dark
            style={{padding: 5, margin: 5}}
            onPress={() => this.addToWatchList(this.props.navigation.state.params.movie)}
            >
            <Text style={{color:`white`}}>Add to Watchlist</Text>
          </Button>
            <Text style={{margin:10}}>{this.props.navigation.state.params.movie.description}</Text>
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)
