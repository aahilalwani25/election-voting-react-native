import axios from 'axios';
//import { Alert } from 'react-native';
import ip from '../../API/NetworkConfig';
//const axios = require('axios');

export class SignUpController {
  chehckAge(date,month,year) {
    let today = new Date();
    let birthDate = new Date(
      year,
      month,
      date,
    ); // create a date object directly from `dob1` argument
    let age_now = today.getFullYear() - birthDate.getFullYear();
    console.log(birthDate, ' ', birthDate.getFullYear());
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    console.log(parseInt(age_now));
    return age_now;
  }

  async getCNIC(cnic) {
    //axios post
    let request = await axios.get(
      `http://${ip.address}:3000/api/user/getcnic/${cnic}`,
    );

    let check=false;
    let response = request.data;
    console.log(response);
    if (response) {
      response.forEach(object => {
        for (const keys in object) {
          if (keys == 'Cnic' && object[keys] != null){
            check=true;
            break;
          }
        }
      });
    }

    return check;
  }

  async getPhone(phone) {
    //axios post
    let request = await axios.get(
      `http://${ip.address}:3000/api/user/getphone/${phone}`,
    );

    let check=false;
    let response = request.data;
    console.log(response);
    if (response) {
      response.forEach(object => {
        for (const keys in object) {
          if (keys == 'Phone' && object[keys] != null){
            check=true;
            break;
          }
        }
      });
    }
    return check;
  }

  async signup(user) {
    //axios post
    let request = await axios.post(
      `http://${ip.address}:3000/api/user/signup/`,
      {
        cnic: user.cnic,
        fullname: user.name,
        email: user.email,
        dob: user.dob,
        phone: user.phone,
        password: user.password,
        gender: user.gender,
      },
    );

    let response = request.data;
    console.log(response);
    if (response) {
      return true;
    }

    return false;
  }
}

//export default{SignUpController};

// let su=new SignUpController();
// let ag= su.chehckAge("");
// console.log(ag);


// this.user.cnic = this.state.cnic;
// this.user.name = this.state.name;
// this.user.gender = this.state.checked;
// this.user.phone = this.state.phone;
// this.user.email = this.state.email;
// this.user.dob = this.state.dob;
// this.user.password = this.state.password;
// this.signUpController
//   .signup(this.user)
//   .then(res3 => {
//     if (res3.valueOf()) {
//       Alert.alert('Signed up successfully!!');
//     }
//   })
//   .catch(err => {
//     console.log(err);
//   });