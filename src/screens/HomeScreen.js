import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import ListHorizontal from '../components/ListHorizontal'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.headerTitle} source={require('../assets/header.png')} />
                    <Text style={styles.headerIcon}>Icon</Text>
                </View>
                <ListHorizontal navigation={this.props.navigation} title="Popular" subtitle="Movies" type="popular" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    header: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    headerTitle: {
        
    },
    headerIcon: {
        
    },
    body: {
      
    }
  });