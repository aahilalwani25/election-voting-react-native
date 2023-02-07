export class OTP{

    constructor(){
        this.confirmResult=null;
        this.message=null;
        this.user=null;
    }
}

// async signup(user) {
//     //axios post
//     let request = await axios.post(
//       `http://192.168.2.107:3000/api/user/signup/`,
//       {
//         cnic: user.cnic,
//         fullname: user.name,
//         email: user.email,
//         dob: user.dob,
//         phone: user.phone,
//         password: user.password,
//         gender: user.gender,
//       },
//     );

//     let response = request.data;
//     console.log(response);
//     if (response) {
//       return true;
//     }
//     return false;
//   }