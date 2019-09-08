// @flow
import React from 'react'
import { StyleSheet, View, Image } from 'react-native';
import ListHorizontal from '../components/ListHorizontal'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

type Props = {
    navigation: any,
}
  
export default class HomeScreen extends React.Component<Props> {
    static navigationOptions = {
        header: null
    };

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <View />
                    <Image source={require('../assets/header.png')} />
                    <FontAwesomeIcon style={styles.headerIcon} color={'gray'} size={ 27 } icon="user-circle" />
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
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
        flexGrow: 1
    },
    headerIcon: {
        
    },
    body: {
      
    }
  });