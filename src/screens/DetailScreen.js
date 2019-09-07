import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Image, ActivityIndicator } from 'react-native';

export default class DetailScreen extends React.Component {
    _onError(error){
        console.log(error)
    }

    constructor(props) {
        super(props)
        this.item = props.navigation.getParam('item')
        this.state = { isLoading: true }
        this._fetchData()
    }

    _fetchData = () => {
        fetch('https://api.themoviedb.org/3/movie/' + this.item.id + '?api_key=d5ab1c88c6fa0649cd46d8723ada06a0', { method:'GET' })
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              dataSource: responseJson,
            }, function(){
    
            });
          })
          .catch((error) =>{
            console.error(error);
        });
      }

    render() {
        if(this.state.isLoading){
            return(
                <View style={styles.container}>
                <ActivityIndicator/>
                </View>
            )
        }  
        const item = this.state.dataSource
        return(
            <View style={styles.container}>
                <View>
                    <ImageBackground
                    style={styles.backgroundImage} 
                    source={{uri: 'https://image.tmdb.org/t/p/w500/' + item.backdrop_path }} 
                    onError={ this._onError.bind(this) }>
                        <View style={styles.headerTitleContent}>
                            <Text style={styles.headerTitle}>{item.title}</Text>
                            <Text style={styles.headerSubtitle}>{item.genres.map((value) => value.name).join(', ')}</Text>
                        </View>
                        <View style={styles.details}>
                            <Text>Reviews</Text>
                            <Text>Mins</Text>
                            <Text>Date</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.grayside}>
                        <View style={styles.actions}>
                            <Text>Watchlist</Text>
                            <Text>Favourites</Text>
                            <Text>Share</Text>
                        </View>   
                    </View>
                    <Image style={styles.posterImage}  source={{uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path }}  />                    
                </View>
                <View>
                    <Text>Overview</Text>
                    <Text>{item.overview}</Text>
                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
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
        backgroundColor: '#CCC',
        justifyContent: 'center'
    },
    headerTitleContent: {
        alignItems: 'center',
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 20,
        color: 'white'
    },
    headerSubtitle: {
        fontSize: 15,
        color: 'white'
    },

    backgroundImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },  
    posterImage: {
        position: 'absolute',
        top: 113,
        left: 20,
        width: 100,
        height: 175,
        resizeMode: 'cover'
    },  
  });
  