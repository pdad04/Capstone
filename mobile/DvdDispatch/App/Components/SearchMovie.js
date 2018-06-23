import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View } from 'react-native'
import { Container, Header, Text, Item, Icon, Input, Button} from 'native-base'
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

  render () {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name='ios-search' />
            <Input placeholder='Search Movie' />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      </Container>
    )
  }
}
