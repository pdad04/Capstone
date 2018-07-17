import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { Container, Content, Footer, FooterTab, Button, Icon, Text, Alert } from 'native-base'
import { connect } from 'react-redux'
import SearchMovie from '../Components/SearchMovie'
import WatchList from '../Components/WatchList'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SearchWatchStyle'

class SearchWatch extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      search: true,
      watchList: []
    }
  }

  addToWatchList(entry){
    this.setState(prevState => ({ watchList: [...prevState.watchList, entry]}))
  }

  removeFromWatchList(index){
    this.setState({watchList: this.state.watchList.filter( (x,i) => i != index)})
  }

  render() {
    if (this.state.search) {
      return (
        <Container>
          <SearchMovie
            watchList={ (entry) => this.addToWatchList(entry)}
           />
          <Content>
          </Content>
          <Footer>
            <FooterTab>
              <Button>
                <Icon name='ios-search' style={styles.buttons} active />
                <Text style={styles.buttons}>Search</Text>
              </Button>
              <Button onPress={ () => this.setState({ search: false })}>
                <Icon name='eye' />
                <Text>Watch List</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      )
    } else {
      return (
        <Container>
          <WatchList
            list={this.state.watchList}
            removeItem={ (index) => this.removeFromWatchList(index) }
          />
          <Footer>
            <FooterTab>
              <Button onPress={ () => this.setState({ search: true })}>
                <Icon name='ios-search' />
                <Text>Search</Text>
              </Button>
              <Button>
                <Icon name='eye' style={styles.buttons} active />
                <Text style={styles.buttons}>Watch List</Text>
              </Button>
            </FooterTab>
          </Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchWatch)
