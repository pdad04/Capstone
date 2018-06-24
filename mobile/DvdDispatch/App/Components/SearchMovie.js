import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View } from 'react-native'
import { Container, Content, Header, Text, Item, Icon, Input, Button } from 'native-base'
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
    this.state = { searchText: '' }
  }

  performSearch() {
    let movies = [];
    return fetch(`http://localhost:3000/api/movies/${this.state.searchText}`)
      .then((response) => response.json())
      .then((responseJson) => {

        for(var i in responseJson){
          movies.push(responseJson[i]);
        }
        
      })
      .catch((error) => {
        console.error(error)
      });
    
  }

  render () {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name='ios-search' />
            <Input 
              placeholder='Search Movie' 
              onChangeText = { (text) => this.setState({ searchText: text }) }
            />
          </Item>
          <Button transparent disabled={!this.state.searchText}
            onPress={() => this.performSearch()}
          >
            <Text>Search</Text>
          </Button>
        </Header>
      </Container>
    )
  }
}
