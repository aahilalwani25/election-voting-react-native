import AsyncStorage from "@react-native-async-storage/async-storage";
import { OTP } from "../Model/Otp";
import auth from '@react-native-firebase/auth';

export class OtpController {

    constructor() {
        this.phone = null;
        this.otp = new OTP();
        this.cr = this.otp.confirmResult;
    }

    async getPhoneNumber() {
        let num = await AsyncStorage.getItem('ph');
        //this.phone=`+${num}`;
        //console.log(num);
        return `+${num}`;
    }

    getOtp() {
        this.getPhoneNumber()
            .then(res => {
                auth()
                    .signInWithPhoneNumber(`+${res}`)
                    .then(confirmResult => {
                        this.otp.confirmResult = confirmResult;
                        this.cr = this.otp.confirmResult;
                        this.otp.message = "Code has been sent";
                    })
                    .catch(error => console.log(error));
            });
        //console.log(this.getPhoneNumber());

    }

    //confir code in OTP controller
    async confirmCode(codeInput) {

        try {
            if (this.cr && codeInput.length > 0) {
                this.cr
                    .confirm(codeInput)
                this.otp.confirmResult = true;
            }
        } catch (error) {
            this.otp.confirmResult = false;
        }
        // if (this.cr && codeInput.length>0) {
        // this.cr
        //     .confirm(codeInput)
        //     .then((user) => {
        //         if(user){
        //             this.otp.confirmResult=true;
        //         }
        //     })
        //     .catch(error =>
        //         this.otp.confirmResult=false
        //     );
        // }

        if (this.otp.confirmResult) {
            return true;
        }
        return false;
    }
}