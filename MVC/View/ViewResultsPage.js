import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { VotingController } from '../Controller/VotingController';
import { PoliticalParties } from '../Model/PoliticalParties';



export default class ViewResultsPage extends React.Component{

  constructor() {
    super();
    this.vc=new VotingController();
    this.pp=new PoliticalParties();
    //this.len=this.vc.calculateVote()
    this.state = {
      data: [],
      parties: this.pp.parties,
    };

  }

  extractVotes(){
    this.vc.calculateVote().then(res => this.setState({data: res}));
  }
  componentDidMount(){
    this.extractVotes();
  }

  componentDidUpdate(){
    this.extractVotes();
  }
  render(){
    
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          data={this.state.parties}
          keyExtractor={(party, index) => index.toString()}
          renderItem={({item}) => (
            <View style={{justifyContent: 'center', alignItems: 'center',flexDirection:'row'}}>
              <Text style={{color: 'black',fontWeight:'bold'}}>{item.name}</Text>
              <Image
                source={item.picture}
                style={{height: 100, width: 200, margin: 20, borderRadius:0}}
              />
              <Text style={{color: 'black'}}>{this.state.data[item.id]} votes</Text>
            </View>
          )}

          scrollEnabled
          
        />
      </View>
    );
  }
}