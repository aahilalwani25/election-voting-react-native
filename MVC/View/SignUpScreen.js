import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {styles} from '../../Styles';
import {User} from '../Model/User';
import {SignUpController} from '../Controller/SignUpController';
// import DatePicker from 'react-native-datepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Icon} from 'react-native-vector-icons/Icon';

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      cnic: null,
      name: null,
      phone: null,
      password: null,
      email: null,
      dob: null,
      checked: 0, //gender
      error: null,
      Cpass: null,
      showCalendar: false,
      mydate: {
        date: null,
        month: null,
        year: null,
      },
      check1:null,
      check2:null,
    };

    //composition
    this.user = new User();  
    this.signUpController = new SignUpController();
  }

  render() {
    return (
      <ScrollView scrollEnabled={true} contentContainerStyle={{height:"100%", width:"100%"}}>
        <View style={styles.container}>
          <Text style={styles.heading}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="CNIC (without dashes)"
            maxLength={13}
            onChangeText={text => {
              this.setState({cnic: text});
            }}
            keyboardAppearance="dark"
            keyboardType={'number-pad'}
            placeholderTextColor={'grey'}
          />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            onChangeText={text => {
              this.setState({name: text});
            }}
            placeholderTextColor={'grey'}
          />
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={{color: 'black', paddingTop: 10, paddingRight: 20}}>
              Gender:
            </Text>
            <RadioButton
              value="Male"
              status={this.state.checked == 1 ? 'checked' : 'unchecked'}
              color="black"
              onPress={() => {
                if (this.state.checked == 1) {
                  this.setState({checked: 0});
                } else {
                  this.setState({checked: 1});
                  this.user.cnic = this.state.checked;
                }
              }}
            />
            <Text style={{color: 'black', paddingTop: 10, paddingRight: 20}}>
              Male
            </Text>
            <RadioButton
              value="Male"
              status={this.state.checked == 2 ? 'checked' : 'unchecked'}
              color="black"
              onPress={() => {
                if (this.state.checked == 2) {
                  this.setState({checked: 0});
                } else {
                  this.setState({checked: 2});
                  this.user.cnic = this.state.checked;
                }
              }}
            />
            <Text style={{color: 'black', paddingTop: 10}}>Female</Text>
          </View>

          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={{color: 'black'}}>
              DOB: {this.state.dob ? this.state.dob : 'mm/dd/yyyy'}
            </Text>

            <TouchableOpacity
              style={[styles.button, {width: 40, height: 40}]}
              onPress={() => {
                this.setState({showCalendar: true});
              }}>
              <Text style={[styles.buttonText]}>DOB</Text>
            </TouchableOpacity>
          </View>

          {this.state.showCalendar && (
            <RNDateTimePicker
              mode="date"
              value={new Date()}
              dateFormat="day month year"
              onChange={(event, date) => {
                let fdate =
                  (date.getMonth() > 9
                    ? date.getMonth() + 1
                    : '0' + (date.getMonth() + 1)) +
                  '/' +
                  (date.getDate() > 9
                    ? date.getDate() + 1
                    : '0' + (date.getDate() + 1)) +
                  '/' +
                  date.getFullYear();

                this.setState({
                  dob: fdate,
                  mydate: {
                    date: date.getDate(),
                    month: date.getMonth(),
                    year: date.getFullYear(),
                  },
                });

                this.setState({showCalendar: false});
              }}
            />
          )}
          <TextInput
            style={styles.input}
            placeholder="Phone Number eg:03001234567 (without dashes)"
            placeholderTextColor={'grey'}
            keyboardAppearance="dark"
            maxLength={13}
            keyboardType={'phone-pad'}
            onChangeText={text => {
              if (text) {
                this.setState({phone: '92' + text});
              } else {
                this.setState({error: 'Phone Number Required'});
              }
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => {
              this.setState({password: text});
            }}
            placeholderTextColor={'grey'}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            onChangeText={text => {
              this.setState({Cpass: text});
              if (this.state.password != text) {
                this.setState({error: 'Incorrect password'});
              } else {
                this.setState({error: null, password: text});
              }
            }}
            placeholderTextColor={'grey'}
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (
                !this.state.cnic ||
                !this.state.name ||
                this.state.checked == 0 ||
                !this.state.password ||
                !this.state.phone ||
                !this.state.dob
              ) {
                Alert.alert('ERROR', 'Fields Required');
              } else {
                if (this.state.password != this.state.Cpass) {
                  Alert.alert(
                    'ERROR',
                    'Password and Confirm Password does not match',
                  );
                } else {
                  if (
                    this.signUpController.chehckAge(
                      this.state.mydate.date,
                      this.state.mydate.month,
                      this.state.mydate.year,
                    ) < 18
                  ) {
                    Alert.alert(
                      'ERROR',
                      'You can not register because your age is below 18',
                    );
                  } else {
                    this.findCnic();
                    this.findPhone();

                    if (this.state.check1 && this.state.check2) {
                      this.user.cnic = this.state.cnic;
                      this.user.name = this.state.name;
                      this.user.gender = this.state.checked;
                      this.user.phone = this.state.phone;
                      this.user.email = this.state.email;
                      this.user.dob = this.state.dob;
                      this.user.password = this.state.password;
                      this.signUpController
                        .signup(this.user)
                        .then(res => {
                          if (res.valueOf()) {
                            Alert.alert('Signed up successfully!!');
                          }
                        })
                        .catch(err => {
                          console.log(err);
                        });
                    }
                  }
                }
              }
            }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  findPhone() {
    this.signUpController
      .getPhone(this.state.phone)
      .then(res => res.valueOf())
      .then(data => {
        if (data) {
          Alert.alert('ERROR', 'Phone already registered');
        }else{
          this.setState({check1:true})
        }
      });

    // if(this.signUpController.getPhone(this.state.phone).valueOf()){
    //   Alert.alert('ERROR', 'Phone already registered');
    // }else{
    //   this.setState({check2:true})
    // }

    //this.signUpController.getPhone(this.state.phone)

    
  }

  findCnic(){
    this.signUpController
      .getCNIC(this.state.cnic)
      .then(res => res.valueOf())
      .then(data => {
        if (data) {
          Alert.alert('ERROR', 'CNIC already registered');
        }else{
          this.setState({check2:true})
        }
      }
    );
  }
}
