// @flow
import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View, Dimensions } from 'react-native';

type Props = {
    item: any,
    onPressItem: any,
    image: string
}
const WINDOWS_WIDTH = Dimensions.get('window').width

export default class ListGridItem extends React.PureComponent<Props> {
    _onPress = (props) => {
        this.props.onPressItem(this.props.item);
    }

    _onError(error){
        console.log(error)
    }

    render() {
        return (
        <TouchableOpacity onPress={this._onPress}>
            <View style={styles.container}>
                <Image 
                    style={[styles.image, {width: (WINDOWS_WIDTH-20)/2}]} 
                    source={{uri: 'https://image.tmdb.org/t/p/w500' + this.props.image }} 
                    onError={ this._onError.bind(this) } />
            </View>
        </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    image: {
      height: 250,
      resizeMode: 'cover',
      borderRadius: 5,
      justifyContent: 'center',
      alignContent: 'center',
    },
  })
  