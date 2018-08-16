import React, { Component } from 'react'
import { View, ListView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Container, Header, Content, Text, List, ListItem, Button, Icon, Right,Body } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { deleteMovie, updateMovie } from '../Redux/actions'

// Styles
import styles from './Styles/MovieWatchListStyle'

let baseUrl = `https://itunes.apple.com/lookup?id=`

class MovieWatchList extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      avail: true
    };
  }

  deleteRow(secId, rowId, rowMap) {
    {this.props.deleteMovie(rowId)}
    rowMap[`${secId}${rowId}`].props.closeRow();
    // const newData = [...this.props.movie];
    // newData.splice(rowId, 1);
  }

  componentDidMount() {
    let movies = [];
    if(this.props.movie.length > 0 ){
      for(var i = 0; i < this.props.movie.length; i++){
        movies.push(this.fetchMovies(this.props.movie[i].trackId))
      }
    }
   Promise.all(movies).then((results)=> {
     const newMov = results.map((x) => film = {
       name: x.results[0].trackName,
       theaterReleaseDate: x.results[0].releaseDate,
       trackId: x.results[0].trackId,
       description: x.results[0].longDescription,
       artworkUrl: x.results[0].artworkUrl100,
       isRentable: x.results[0].trackRentalPrice || false});

      this.props.updateMovie(newMov);
    });
  }

  fetchMovies(id) {
     return fetch(`${baseUrl}${id}`).then((response) => response.json())
        .catch((error) => {
          console.error(error)
        });
  }

  render () {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Header  searchBar rounded/>
        <Content>
          <List
            dataSource={this.ds.cloneWithRows(this.props.movie)}
            renderRow={data =>
              <ListItem icon>
                <Body>
                  <Text> {data.name} </Text>
                </Body>
                <Right>
                  {/* <Icon name='ios-checkmark-circle' /> */}
                  <Ionicons name={data.isRentable ? 'ios-eye' : 'ios-eye-off'} size={25} color={data.isRentable ? 'green' : 'red'} />
                </Right>
              </ListItem>}
            renderLeftHiddenRow={data =>
              <Button full onPress={() => alert(data.name)}>
                <Icon name="information-circle" />
              </Button>}
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={_ => {
                this.deleteRow(secId, rowId, rowMap)
              }}>
                <Icon active name="trash" />
              </Button>}
            leftOpenValue={75}
            rightOpenValue={-75}
          />
        </Content>
      </Container>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    movie: state.movie.watchList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteMovie: index => dispatch(deleteMovie(index)),
    updateMovie: (movie) => dispatch(updateMovie(movie))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieWatchList)
