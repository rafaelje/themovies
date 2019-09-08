// @flow
import React from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import ListHorizontalItem from './ListHorizontalItem'

type Props = {
  type: string,
  navigation: any,
  title: string,
  subtitle: string,
}

type State = {
  isLoading: boolean,
  dataSource?: Array<any>
}

export default class ListHorizontal extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
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
    this.props.navigation.push('DetailsScreen', { item: item })
  };

  _renderItem = ({item}) => (
      <ListHorizontalItem 
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
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#E84E42"/>
        </View>
      )
    }

    if(Array.isArray(this.state.dataSource) && this.state.dataSource.length === 0) { return null }

    const Header = () => {
      return(
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{this.props.title}</Text>
            <Text style={styles.headerSubtitle}>{this.props.subtitle}</Text>
          </View>
          <TouchableOpacity onPress={ () => { this.props.navigation.navigate('FullListScreen', { title: this.props.title + ' ' + this.props.subtitle, type: this.props.type }) }}>
            <Text style={styles.headerLink}>Show All</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return(
      <View style={styles.container}>
        <Header />
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
    padding: 5,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 20,
    marginLeft: 5,
  },
  headerLink: {
    color: 'blue',
  },
});
  