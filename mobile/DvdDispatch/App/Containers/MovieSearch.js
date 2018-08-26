import React, { Component } from 'react'
import { View, AsyncStorage, FlatList, TouchableOpacity, TouchableHighlight, Alert, ActivityIndicator } from 'react-native'
import { Container, Content, Header, Text, Item, Icon, Input, Button, List, ListItem, Left, Right, Body } from 'native-base'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Movie from '../Models/movie'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MovieSearchStyle'

let baseUrl = `https://itunes.apple.com/search?term=`

// ${req.params.name}&media=movie&entity=movie&attribute=movieTerm

class MovieSearch extends Component {
  constructor (props) {
    super(props)
    this.state = { searchText: '', movies: [], searchedPerformed: false, searching: false }
  }

  static navigationOptions = ({ navigation }) => {
    return {
       header: 'none'
    }
 }

  performSearch() {
    this.setState({ searching: true })
    return fetch(`${baseUrl}${this.state.searchText}&media=movie&entity=movie&attribute=movieTerm`)
      .then((response) =>  response.json())
      .then((responseJson) => {
        let movies = [];
  
        for(var i = 0; i < responseJson.results.length; i++){
          if(responseJson.results[i].hasOwnProperty('trackRentalPrice') || responseJson.results[i].hasOwnProperty('trackHdRentalPrice')){
            movies.push(new Movie(responseJson.results[i].trackName, 
                                  responseJson.results[i].releaseDate, 
                                  responseJson.results[i].trackId,
                                  responseJson.results[i].longDescription,
                                  responseJson.results[i].artworkUrl100,
                                  responseJson.results[i].trackRentalPrice)
                        );
          }else{
            movies.push(new Movie(responseJson.results[i].trackName, 
                                  responseJson.results[i].releaseDate, 
                                  responseJson.results[i].trackId,
                                  responseJson.results[i].longDescription,
                                  responseJson.results[i].artworkUrl100)
                        );
          }
        }

       this.setState({movies: movies, searchedPerformed: true, searching: false})
      })
      .catch((error) => {
        Alert.alert('Hmmm something went wrong. Please try your search again','');
        this.setState({searching: false})
      });
  }

  render () {
    if(this.state.searching){
      return(
        <Container style={styles.indicator}>
            <ActivityIndicator size='large' color='gray' />
        </Container>
      )
    }

    if(this.state.searchedPerformed){
      if(this.state.movies.length === 0){
        return(
          <Container>
            <Header searchBar rounded style={styles.background}>
              <Item>
                <Icon name='ios-search'/>
                <Input
                  clearButtonMode={'while-editing'}
                  placeholder='Search Movie'
                  returnKeyType={'search'}
                  onSubmitEditing={() => {
                    if(this.state.searchText){
                      this.performSearch()
                    }
                  }}
                  onChangeText = { (text) => {
                    this.setState({ searchText: text});
                    AsyncStorage.setItem('inputKey', text);
                  }}
                  value={this.state.searchText}
                />
              </Item>
            </Header>
            <Container style={styles.indicator}>
              <Ionicons name='ios-sad-outline' color='red' size={42} />
              <Text style={styles.noResults}>Movie not found</Text>
            </Container>
          </Container>
        )
      }
      return (
        <Container>
          <Header searchBar rounded style={styles.background}>
            <Item>
              <Icon name='ios-search'/>
              <Input
                clearButtonMode={'while-editing'}
                placeholder='Search Movie'
                returnKeyType={'search'}
                onSubmitEditing={() => {
                  if(this.state.searchText){
                    this.performSearch()
                  }
                }}
                onChangeText = { (text) => {
                  this.setState({ searchText: text, searchedPerformed: text ? true : false });
                  AsyncStorage.setItem('inputKey', text);
                }}
                value={this.state.searchText}
              />
            </Item>
          </Header>
          <Content>
          <FlatList
            data={this.state.movies}
            keyExtractor={(item, index) => index.toString() }
            renderItem={({item}) =>(
                <ListItem noIndent
                  onPress={() =>
                    this.props.navigation.navigate('Details', {movie: item})}
                >
                  <Left>
                    <Body>
                      <Text>{item.name}</Text>
                      <Text note style={styles.textNote}>Release Date: {new Date(item.theaterReleaseDate).toLocaleDateString()}</Text>
                    </Body>
                  </Left>
                  <Right>
                    <Icon name='arrow-forward' />
                  </Right>
                </ListItem>
            )}
          />
          </Content>
        </Container>
      )
    }else{
      return (
        <Container>
          <Header searchBar rounded style={styles.background}>
            <Item>
              <Icon name='ios-search' />
              <Input
                clearButtonMode={'while-editing'}
                placeholder='Search Movie'
                returnKeyType={'search'}
                onSubmitEditing={() => {
                  if(this.state.searchText){
                    this.performSearch()
                  }
                }}
                onChangeText = { (text) => {
                  this.setState({ searchText: text });
                  AsyncStorage.setItem('inputKey', text);
                }}
                value={this.state.searchText}
              />
            </Item>
          </Header>
        </Container>
      )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieSearch)
