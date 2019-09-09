// @flow
import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

type Props = {
    backdrop_path: string,
    title: string,
    genres: any,
    vote_average: string,
    vote_count: string,
    runtime: string,
    release_date: string,
    poster_path: string,
}
  
export default class HeaderDetail extends React.PureComponent<Props> {
    
    _onError(error: string){
        console.log(error)
    }

    render() {
        const item = this.props

        const DetailItem = (props: any) => {
            return (
                <View style={styles.detailItem}>
                    <FontAwesomeIcon color={'white'} size={ 15 } icon={props.icon} />
                    <Text style={styles.detailText}>{props.text}</Text>
                </View>
            )
        }

        const ActionItem = (props: any) => {
            return (
                <View style={styles.actionItem}>
                    <FontAwesomeIcon color={'gray'} size={ 20 } icon={props.icon} />
                    <Text style={styles.actionText}>{props.text}</Text>
                </View>
            )
        }

        return(
            <View>
                <ImageBackground
                style={styles.backgroundImage} 
                source={{uri: 'https://image.tmdb.org/t/p/w500/' + item.backdrop_path }} 
                onError={ this._onError.bind(this) }>
                    <View style={styles.headerTitleContent}>
                        <Text style={styles.headerTitle}>{item.title}</Text>
                        <Text style={styles.headerSubtitle}>{item.genres.map((value: {name: string}) => value.name).join(', ')}</Text>
                    </View>
                    <View style={styles.details}>
                        <DetailItem text={`${item.vote_average} (${item.vote_count}) Reviews`} icon="star" />
                        <DetailItem text={`${item.runtime} mins`} icon="clock" />
                        <DetailItem text={`${item.release_date} Released`} icon="calendar" />
                    </View>
                </ImageBackground>
                <View style={styles.grayside}>
                    <View style={styles.actions}>
                        <ActionItem text="Watchlist" icon="list" />
                        <ActionItem text="Favourites" icon="heart" />
                        <ActionItem text="Share" icon="share" />
                    </View>   
                </View>
                <Image style={styles.posterImage}  source={{uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path }}  />                    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    actionItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionText: {
        color: 'gray',
        marginTop: 5,
    },
    detailItem:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    detailText: {
        color: 'white',
        marginLeft: 10,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 150, 
        marginRight: 20,
    },
    details: {
        position: 'absolute',
        bottom: 5,
        left: 130
    },
    grayside: {
        width: '100%',
        height: 100,
        backgroundColor: '#EEE',
        justifyContent: 'center'
    },
    headerTitleContent: {
        alignItems: 'center',
        marginTop: 100,
        marginLeft: 10,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 15,
        color: 'white'
    },

    backgroundImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover'
    },  
    posterImage: {
        position: 'absolute',
        top: 210,
        left: 20,
        width: 100,
        height: 175,
        resizeMode: 'cover',
        borderRadius: 5,
    },  
})
