import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import ListGrid from '../components/ListGrid'

export default class FullListScreen extends React.Component {
    constructor(props) {
        super(props)
        this.type = this.props.navigation.getParam('type')
        this.title = this.props.navigation.getParam('title')
    }
    
    render() {
        const Strong = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
        return(
            <View style={styles.container}>
                <View>
                    <Text>{this.title}</Text>
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
  });