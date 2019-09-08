import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ListGrid from '../components/ListGrid'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export default class FullListScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)
        this.type = this.props.navigation.getParam('type')
        this.title = this.props.navigation.getParam('title')
    }
    
    render() {
        const Strong = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <FontAwesomeIcon color={'#E84E42'} size={ 27 } icon="chevron-left" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{this.title}</Text>
                    <FontAwesomeIcon color={'gray'} size={ 27 } icon="search" />
                </View>
                <ListGrid navigation={this.props.navigation} type={this.type} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    headerTitle: {
        color: '#E84E42',
        fontSize: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    }
  });