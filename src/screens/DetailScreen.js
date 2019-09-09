// @flow
import React from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import ListHorizontal from '../components/ListHorizontal'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import HeaderDetail from '../components/HeaderDetail'

type Props = {
    navigation: any,
}
  
type State = {
    isLoading: boolean,
    dataSource?: any
}

export default class DetailScreen extends React.Component<Props, State> {
    static navigationOptions = {
        header: null
    }
    
    item: any
    constructor(props: Props) {
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
          .catch((error: string) =>{
            console.error(error);
        })
      }

    render() {
        if(this.state.isLoading){
            return(
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#E84E42"/>
                </View>
            )
        }  
        
        const item: any = this.state.dataSource
        
        return(
            <ScrollView>
                <View style={styles.container}>
                    <HeaderDetail 
                        backdrop_path={item.backdrop_path}
                        poster_path={item.poster_path}
                        title={item.title}
                        genres={item.genres}
                        vote_average={item.vote_average}
                        vote_count={item.vote_count}
                        runtime={item.runtime}
                        release_date={item.release_date}
                         />

                    <View style={styles.back}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <FontAwesomeIcon color={'white'} size={ 27 } icon="chevron-left" />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.overview}>
                        <Text style={styles.overviewTitle}>Overview</Text>
                        <Text>{item.overview}</Text>
                        <Text style={styles.readMore}>Read More</Text>
                    </View>

                    <View style={styles.footer}>
                        <ListHorizontal showAll={false} title="Recommendation" subtitle="" navigation={this.props.navigation} type={item.id + '/recommendations'} />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    container: {
      flex: 1,
    },
    back: {
        position: 'absolute',
        left: 1,
        top: 40,
    },
    overview: {
        padding: 20,
    },
    overviewTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    footer: {
        padding: 20,
    },
    readMore: {
        color: 'blue',
        marginTop: 5,
    },
})
  