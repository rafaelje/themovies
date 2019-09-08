// @flow
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

type Props = {
    navigation: any,
    title: string,
}
  
export default class HeaderSearch extends React.PureComponent<Props> {

    render() {
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <FontAwesomeIcon color={'#E84E42'} size={ 27 } icon="chevron-left" />
                </TouchableOpacity>
                <Text style={styles.title}>{this.props.title}</Text>
                <FontAwesomeIcon color={'gray'} size={ 27 } icon="search" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        color: '#E84E42',
        fontSize: 20,
    },
})
