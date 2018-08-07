import React, { Component } from 'react'
import { View, ListView } from 'react-native'
import { Container, Header, Content, Text, List, ListItem, Button, Icon } from 'native-base'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MovieWatchListStyle'

class MovieWatchList extends Component {
  // WatchScreen

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      watchList: window.watchList
      //listViewData: datas,
    };
  }


  deleteRow(secId, rowId, rowMap) {
    {this.props.removeItem(rowId)}
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...window.WatchList];
    newData.splice(rowId, 1);
  }

  render () {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Header  searchBar rounded/>
        <Content>
          <List
            dataSource={this.ds.cloneWithRows(window.watchList)}
            renderRow={data =>
              <ListItem>
                <Text> {data.name} </Text>
              </ListItem>}
            renderLeftHiddenRow={data =>
              <Button full onPress={() => alert(data.name)}>
                <Icon active name="information-circle" />
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieWatchList)
