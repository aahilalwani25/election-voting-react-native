import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import { styles } from '../../Styles';
import auth from '@react-native-firebase/auth';
import { OtpController } from '../Controller/OtpController';
import { VotingController } from '../Controller/VotingController';

class OTPScreen extends React.Component {

  constructor(){
    super();

    this.otpController=new OtpController();
    this.votingController=new VotingController();
    
    this.state={
      codeInput:null,
    };

  }
  componentDidMount(){
    //fetch mobile Number using CNIC from storage and then send OTP
    //const {party}= this.props.route.params;
    //this.setState({partyChoice: party});
    //console.log(party);
    this.otpController.getOtp();
  }
  
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.heading}>OTP has been sent to your mobile Number</Text>
          <Text style={styles.heading}>Enter OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="OTP"
            placeholderTextColor={'grey'}
            keyboardType="number-pad"
            onChangeText={(text)=>{
              this.setState({codeInput:text});
            }}
          />
          <TouchableOpacity style={styles.button}
          onPress={()=>{
            //code for submission
            if(this.state.codeInput){
              this.otpController.confirmCode(this.state.codeInput).then(res => {
                console.log(res.valueOf());
                if (res.valueOf()==true && res.valueOf()!==undefined) {
                  Alert.alert('SUCCESS', 'Vote submitted successfully!!');
                  this.props.navigation.navigate('dashboard');
                  const {party} = this.props.route.params;
                  this.votingController.submitVote(party);
                } else {
                  Alert.alert('ERROR', 'Wrong OTP!!');
                }
              });
            }else{
              Alert.alert('ERROR', 'No OTP!!');
            }
            
            //add the vote into the database
          }}
          >
            <Text style={styles.buttonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default OTPScreen;
