import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, ListView } from 'react-native'
import { Container, Header, Content, Text, List, ListItem, Button, Icon } from 'native-base'
import styles from './Styles/WatchListStyle'
// const datas = [
//   'Simon Mignolet',
//   'Nathaniel Clyne',
//   'Dejan Lovren',
//   'Mama Sakho',
//   'Alberto Moreno',
//   'Emre Can',
//   'Joe Allen',
//   'Phil Coutinho',
// ];

export default class WatchList extends Component {
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
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      //listViewData: datas,
    };
  }
  
  // deleteRow(secId, rowId, rowMap) {
  //   rowMap[`${secId}${rowId}`].props.closeRow();
  //   const newData = [...this.state.listViewData];
  //   newData.splice(rowId, 1);
  //   this.setState({ listViewData: newData });
  // }

  deleteRow(secId, rowId, rowMap) {
    {this.props.removeItem(rowId)}
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.props.list];
    newData.splice(rowId, 1);
  }

  render () {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Container>
        <Header  searchBar rounded/>
        <Content>
          <List
            dataSource={this.ds.cloneWithRows(this.props.list)}
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
