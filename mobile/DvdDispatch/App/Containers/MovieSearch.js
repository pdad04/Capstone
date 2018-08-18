import React, { Component } from 'react'
import { View, AsyncStorage, FlatList, TouchableOpacity, TouchableHighlight, Alert, ActivityIndicator } from 'react-native'
import { Container, Content, Header, Text, Item, Icon, Input, Button, List, ListItem, Left, Right, Body } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MovieSearchStyle'

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

  // componentDidMount(){
  //   AsyncStorage.getItem('inputKey').then((value) => {
  //     if(value !== null){
  //       this.setState({ searchText: value });
  //     }
  //   }).done();
  // }

  performSearch() {
    this.setState({ searching: true })
    return fetch(`http://localhost:3000/api/movies/${this.state.searchText}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({movies: responseJson, searchedPerformed: true, searching: false})
      })
      .catch((error) => {
        console.error(error)
      });
  }

  render () {
    if(this.state.searching){
      return(
        <Container style={styles.progressIndicator}>
            <ActivityIndicator size='large' color='gray' />
        </Container>
      )
    }
    if(this.state.searchedPerformed){
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
                  this.setState({ searchText: text });
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
