import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
  FlatList,
  Alert,
} from 'react-native';
import {styles} from '../../Styles';
import {VotingController} from '../Controller/VotingController';
import {RadioButton} from 'react-native-paper';

class VotingScreen extends React.Component {
  componentDidMount() {
    this.checkUserVoted();
  }

  checkUserVoted() {
    //here you'll check whether user has already voted or not
    this.votingController.cheeckIfUserVotedBefore().then(res => {
      this.setState({voted: res.valueOf()});
      //console.log(res.valueOf());
    });
  }

  componentDidUpdate() {
    this.checkUserVoted();
  }

  constructor() {
    super();
    this.state = {
      checked: 0,
      voted: null,
    };

    this.votingController = new VotingController();
  }

  render() {
    if (this.state.voted == false) {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>Select a party to vote</Text>
          <View>
            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              <RadioButton
                value="Male"
                status={this.state.checked == 1 ? 'checked' : 'unchecked'}
                color="black"
                onPress={() => {
                  if (this.state.checked == 1) {
                    this.setState({checked: 0});
                  } else {
                    this.setState({checked: 1});
                  }
                }}
              />
              <Text style={styles.optionText}>PTI</Text>
              <Image
                style={styles.optionImage}
                source={require('../../assets/1.jpg')}
              />
            </View>

            <View
              style={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                paddingRight: 60,
              }}>
              <RadioButton
                value="Male"
                status={this.state.checked == 2 ? 'checked' : 'unchecked'}
                color="black"
                onPress={() => {
                  if (this.state.checked == 2) {
                    this.setState({checked: 0});
                  } else {
                    this.setState({checked: 2});
                  }
                }}
              />
              <Text style={styles.optionText}>PMLN</Text>
              <Image
                style={styles.optionImage}
                source={require('../../assets/2.jpg')}
              />
            </View>
            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              <RadioButton
                value="Male"
                status={this.state.checked == 3 ? 'checked' : 'unchecked'}
                color="black"
                onPress={() => {
                  if (this.state.checked == 3) {
                    this.setState({checked: 0});
                  } else {
                    this.setState({checked: 3});
                  }
                }}
              />
              <Text style={styles.optionText}>PPP</Text>
              <Image
                style={styles.optionImage}
                source={require('../../assets/3.jpg')}
              />
            </View>

            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              <RadioButton
                value="Male"
                status={this.state.checked == 4 ? 'checked' : 'unchecked'}
                color="black"
                onPress={() => {
                  if (this.state.checked == 4) {
                    this.setState({checked: 0});
                  } else {
                    this.setState({checked: 4});
                  }
                }}
              />
              <Text style={styles.optionText}>MQM</Text>
              <Image
                style={styles.optionImage}
                source={require('../../assets/4.jpg')}
              />
            </View>
          </View>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'black'}]}
            onPress={() => {
              if (this.state.checked == 0) {
                Alert.alert('ERROR', 'You have not voted yet!!');
              } else {
                Alert.alert(
                  'CONFIRMATION',
                  'You have selected one Party. Are you sure?',
                  [
                    {
                      text: 'YES',
                      onPress: () => {
                        console.log(this.state.checked);
                        this.props.navigation.navigate('otp', {
                          party: this.state.checked,
                        });
                      },
                    },
                    {
                      text: 'NO',
                    },
                  ],
                );
              }
            }}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>You have already voted</Text>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'black'}]}
            onPress={() => {
              //console.log('go back');
              this.props.navigation.pop();
              AsyncStorage.removeItem('cnic');
              AsyncStorage.removeItem('ph');
            }}>
            <Text style={styles.buttonText}>LOG OUT</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

export default VotingScreen;
