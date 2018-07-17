import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, AsyncStorage, FlatList, TouchableOpacity, TouchableHighlight, Alert } from 'react-native'
import { Container, Content, Header, Text, Item, Icon, Input, Button, List, ListItem, Left, Right } from 'native-base'
import styles from './Styles/SearchMovieStyle'

export default class SearchMovie extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  constructor(props) {
    super(props)
    this.state = { searchText: '', movies: [], searchedPerformed: false }
  }

  componentDidMount(){
    console.log(this.props.watchList)
    AsyncStorage.getItem('inputKey').then((value) => {
      if(value !== null){
        this.setState({ searchText: value });
      }
    }).done();
  }

  performSearch() {
    return fetch(`http://localhost:3000/api/movies/${this.state.searchText}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({movies: responseJson, searchedPerformed: true})
      })
      .catch((error) => {
        console.error(error)
      });
    
  }

  render () {
    if(this.state.searchedPerformed){
      return (
        <Container>
          <Header searchBar rounded>
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
          <Content>
          <FlatList
            data={this.state.movies}
            keyExtractor={(item, index) => index.toString() }
            renderItem={({item}) =>(
                <ListItem noIndent
                  onPress={() => 
                    Alert.alert(`Add "${item.name}" to Watch List?`, ``, [{text: 'Add', onPress:() => this.props.watchList(item), style:'default'}, {text: 'Cancel', style:'cancel'}])}
                >
                  <Left>
                    <Text>{item.name}</Text>
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
          <Header searchBar rounded>
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
