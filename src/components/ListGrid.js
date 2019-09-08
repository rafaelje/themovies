// @flow
import React from 'react';
import { FlatList, ActivityIndicator, StyleSheet, View } from 'react-native';
import ListGridItem from './ListGridItem'

type Props = {
  type: string,
  navigation: any,
};

type State = {
  isLoading: boolean,
  dataSource?: any
};
export default class ListGrid extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount(){    
    this._fetchData()
    this._renderItem = this._renderItem.bind(this);
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
      .catch((error: any) =>{
        console.error(error);
    });
  }
    
  _onPressItem = (item) => {
    this.props.navigation.navigate('DetailsScreen', { item: item })
  };

  _renderItem = ({item}) => (
      <ListGridItem 
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
          numColumns={2}
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
})
  