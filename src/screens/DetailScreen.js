import React from 'react'
import { StyleSheet, View, Text, ImageBackground, Image, ActivityIndicator } from 'react-native';
import ListHorizontal from '../components/ListHorizontal'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export default class DetailScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

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
            <ScrollView>
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
                            <View style={styles.detailItem}>
                                <FontAwesomeIcon color={'white'} size={ 15 } icon="star" />
                                <Text style={styles.detailText}>{`${item.vote_average} (${item.vote_count}) Reviews`}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <FontAwesomeIcon color={'white'} size={ 15 } icon="clock" />
                                <Text style={styles.detailText}>{`${item.runtime} mins`}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <FontAwesomeIcon color={'white'} size={ 15 } icon="calendar" />
                                <Text style={styles.detailText}>{`${item.release_date} Released`}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={styles.grayside}>
                        <View style={styles.actions}>
                            <View style={styles.actionItem}>
                                <FontAwesomeIcon color={'gray'} size={ 20 } icon="list" />
                                <Text style={styles.actionText}>Watchlist</Text>
                            </View>
                            <View style={styles.actionItem}>
                                <FontAwesomeIcon color={'gray'} size={ 20 } icon="heart" />
                                <Text style={styles.actionText}>Favourites</Text>
                            </View>
                            <View style={styles.actionItem}>
                                <FontAwesomeIcon color={'gray'} size={ 20 } icon="share" />
                                <Text style={styles.actionText}>Share</Text>
                            </View>
                        </View>   
                    </View>
                    <Image style={styles.posterImage}  source={{uri: 'https://image.tmdb.org/t/p/w500/' + item.poster_path }}  />                    
                </View>
                <View style={styles.back}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <FontAwesomeIcon color={'white'} size={ 27 } icon="chevron-left" />
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <Text style={styles.bodyTitle}>Overview</Text>
                    <Text>{item.overview}</Text>
                </View>
                <View style={styles.footer}>
                    <ListHorizontal showAll={false} title="Recommendation" navigation={this.props.navigation} type={item.id + '/recommendations'} />
                </View>
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
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
    back: {
        position: 'absolute',
        left: 1,
        top: 10,
    },
    body: {
        padding: 20,
    },
    footer: {
        padding: 20,
    },
    bodyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
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
        marginTop: 40,
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
        height: 200,
        resizeMode: 'cover'
    },  
    posterImage: {
        position: 'absolute',
        top: 113,
        left: 20,
        width: 100,
        height: 175,
        resizeMode: 'cover',
        borderRadius: 5,
    },  
  });
  