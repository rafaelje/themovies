// @flow
import React from 'react'
import { StyleSheet, View, Image } from 'react-native';
import ListHorizontal from '../components/ListHorizontal'
import HeaderHome from '../components/HeaderHome'

type Props = {
    navigation: any,
}

export default class HomeScreen extends React.Component<Props> {
    static navigationOptions = {
        header: null
    }

    render() {
        return(
            <View style={styles.container}>
                <HeaderHome />
                <ListHorizontal navigation={this.props.navigation} title="Popular" subtitle="Movies" type="popular" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  })