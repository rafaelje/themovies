import React from 'react';
import { FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Text, View } from 'react-native';

class NewsListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    };

    _onError(error){
        console.log(error)
    }

    render() {
        return (
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.containerItem}>
            <Image 
              style={styles.imageItem} 
              source={{uri: 'https://image.tmdb.org/t/p/w500' + this.props.image }} 
              onError={ this._onError.bind(this) } >
            </Image>
          </View>
        </TouchableOpacity>
        );
    }
}

export default class ListHorizontal extends React.Component {

  constructor(props) {
        super(props);
        this.state ={ isLoading: true }
      }
    
      _fetchData() {
        fetch('https://api.themoviedb.org/3/movie/' + this.props.type + '?api_key=d5ab1c88c6fa0649cd46d8723ada06a0', { method:'GET' })
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              dataSource: responseJson.results,
            }, function(){
    
            });
          })
          .catch((error) =>{
            console.error(error);
        });
      }
    
      componentDidMount(){    
        this._fetchData()
        this._renderItem = this._renderItem.bind(this);
      }
    
      _onPressItem = (item) => {
        this.props.navigation.navigate('DetailsScreen', { item: item })
      };
    
      _renderItem = ({item}) => (
          <NewsListItem 
            item={item}
            onPressItem={this._onPressItem}
            image={item.poster_path}
          />
      )
    
      _onRefresh() {
        this.setState({ isLoading: true }, function() { this._fetchData() });
      }
    
      render() {

        if(this.state.isLoading){
          return(
            <View style={styles.container}>
              <ActivityIndicator/>
            </View>
          )
        }
    
        return(
          <View style={styles.container}>
            <FlatList
              horizontal={true}
              data={this.state.dataSource}
              renderItem={this._renderItem}
              keyExtractor={({id}, index) => index.toString()}
              extraData={this.state}
              onRefresh={() => this._onRefresh()}
              refreshing={this.state.isLoading}
            />
          </View>
        );
      }    
}

const styles = StyleSheet.create({
    container: {
      paddingBottom: 1,
    },
    containerItem: {
      width: 100,
      height: 175,
      padding: 5,
    },
    containerText: {
      position: 'absolute',
      bottom:0
    },
    titleItem: {
      fontSize: 20,
      color: '#FFF',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '5%',
    },
    imageItem: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 5,
      
    },
    category: {
      backgroundColor: '#E2BC27',
      color: 'white',
      padding: 5,
      margin: 5,
    },
    containerCategory: {
      flex: 1,
      alignItems: 'flex-end',
    }

  });
  