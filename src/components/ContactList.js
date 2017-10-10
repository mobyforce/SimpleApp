import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text,
  TouchableHighlight
} from 'react-native';

export default class ContactList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    var Contacts = require('react-native-contacts')

    Contacts.getAll((err, contacts) => {
      if(err === 'denied'){
        // error
        console.log('Error in accessing contacts')
      } else {
        // contacts returned in []
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(contacts)
        });
      }
    })

  }

  render() {
    return (
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderContact.bind(this)}
            style={styles.listView}
            />
    );
  }

  renderContact(contact) {
       return (
            <TouchableHighlight>
                <View>
                    <View style={styles.container}>
                        <View style={styles.rightContainer}>
                            <Text style={styles.title}>{contact.givenName} {contact.familyName}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
       );
   }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginBottom: 8
    },
    author: {
        color: '#656565'
    }
});
