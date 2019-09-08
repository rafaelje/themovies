// @flow    
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const HeaderHome = () => {
    return (
        <View style={styles.header}>
            <View />
            <Image source={require('../assets/header.png')} />
            <FontAwesomeIcon color={'gray'} size={ 27 } icon="user-circle" />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

  export default HeaderHome;