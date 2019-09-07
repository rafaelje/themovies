import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import ListGrid from '../components/ListGrid'

export default class FullListScreen extends React.Component {
    render() {
        return(
            <View style={styles.container}>
                <Text>Full List {this.props.type}</Text>
                <ListGrid navigation={this.props.navigation} type={this.props.navigation.getParam('type')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  });