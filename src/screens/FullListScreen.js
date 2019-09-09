// @flow
import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native';
import ListGrid from '../components/ListGrid'
import HeaderSearch from '../components/HeaderSearch'

type Props = {
    navigation: any,
}
  
type State = {
    isLoading: boolean,
    dataSource?: any
}

export default class FullListScreen extends React.Component<Props, State> {
    static navigationOptions = {
        header: null
    }

    type: string
    title: string
    constructor(props: Props) {
        super(props)
        this.type = this.props.navigation.getParam('type')
        this.title = this.props.navigation.getParam('title')
    }
    
    render() {
        return(
            <SafeAreaView style={styles.container}>
                <HeaderSearch navigation={this.props.navigation} title={this.title} />
                <ListGrid navigation={this.props.navigation} type={this.type} />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
})