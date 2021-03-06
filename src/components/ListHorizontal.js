// @flow
import React from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import ListHorizontalItem from './ListHorizontalItem'

type Props = {
  type: string,
  navigation: any,
  title: string,
  subtitle: string,
  showAll: boolean,
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

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#E84E42"/>
        </View>
      )
    }

    if(Array.isArray(this.state.dataSource) && this.state.dataSource.length === 0) { return null }

    const ShowAll = (props) => {
      if(props.showAll === false) { return null }
      return (
        <TouchableOpacity onPress={ () => { props.navigation.navigate('FullListScreen', { title: props.title + ' ' + props.subtitle, type: props.type }) }}>
          <Text style={styles.headerLink}>Show All</Text>
        </TouchableOpacity>
      )
    }

    const Header = () => {
      return(
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{this.props.title}</Text>
            <Text style={styles.headerSubtitle}>{this.props.subtitle}</Text>
          </View>
          <ShowAll
            navigation={this.props.navigation} 
            showAll={this.props.showAll} 
            title={this.props.title} 
            subtitle={this.props.subtitle} 
            type={this.props.type} />
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
  