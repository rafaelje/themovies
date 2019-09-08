// @flow
import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';

type Props = {
    item: any,
    onPressItem: any,
    image: string
}
  
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
            style={styles.image} 
            source={{uri: 'https://image.tmdb.org/t/p/w500' + this.props.image }} 
            onError={ this._onError.bind(this) } >
            </Image>
        </View>
        </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      width: 150,
      height: 225,
      padding: 5,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 5,      
    },
  })
  