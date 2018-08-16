import React, { Component } from 'react'
import { ScrollView, Text, Image, Alert } from 'react-native'
import { Container, Content, Button } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { addMovie } from '../Redux/actions'

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

  componentWillMount(){
    // iTunes API only returns a 60x60 or 100x100 for artwork image. 
    // Replace with 227x227 for better apperance.
    this.props.navigation.state.params.movie['artworkUrl'] = this.props.navigation.state.params.movie.artworkUrl.replace('100x100bb.jpg','227x227bb.jpg');
  }

  addToWatchList(entry){
    if(entry.isRentable){
      Alert.alert(
        'Movie Available',
        `This movie is already available to rent for $${entry.isRentable}. Would you like to add it anyways?`,
        [
         {text: 'Cancel', onPress:() => {return}, syle: 'cancel'},
         {text: 'OK', onPress: () => this.props.addMovie(entry)}
        ] );
      
      return
    }

    this.props.addMovie(entry);
  }

  render () {
    return (
      <Container>
        <Content>
          <Image
            style={{width: 227, height: 227, marginTop: 10, marginLeft: 'auto', marginRight: 'auto'}}
            source={{uri: this.props.navigation.state.params.movie.artworkUrl}}
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
    movie: state.movie
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMovie: (movie) => {
      dispatch(addMovie(movie));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)
