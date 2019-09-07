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
                    <Text style={styles.headerTitle}>THE MOVIE</Text>
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