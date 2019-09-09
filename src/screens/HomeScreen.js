// @flow
import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native';
import ListHorizontal from '../components/ListHorizontal'
import HeaderHome from '../components/HeaderHome'
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
    navigation: any,
}

export default class HomeScreen extends React.Component<Props> {
    static navigationOptions = {
        header: null
    }

    render() {
        return(
                <SafeAreaView style={styles.container}>
                    <HeaderHome />
                    <ScrollView>
                        <ListHorizontal showAll navigation={this.props.navigation} title="Recommend" subtitle="For You" type="now_playing" />
                        <ListHorizontal showAll navigation={this.props.navigation} title="Popular" subtitle="Movies" type="popular" />
                        <ListHorizontal showAll navigation={this.props.navigation} title="Comming" subtitle="Soon" type="upcoming" />
                        <ListHorizontal showAll navigation={this.props.navigation} title="Top Rated" subtitle="Movie" type="top_rated" />
                    </ScrollView>
                </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  })