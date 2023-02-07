import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import SignUp from "../MVC/View/SignUpScreen";
import StartScreen from "../MVC/View/StartScreen";
import LoginScreen from "../MVC/View/Login";
import Dashboard from "../MVC/View/Dashboard";
import ViewResultsPage from "../MVC/View/ViewResultsPage";
import OTPScreen from "../MVC/View/OTPScreen";

let Stack=createStackNavigator();

export default class NavStack extends React.Component{

    render(){
        return (
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={'startScreen'}
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="startScreen" component={StartScreen} />
              <Stack.Screen name="signup" component={SignUp} />
              <Stack.Screen name="login" component={LoginScreen} />
              <Stack.Screen name="viewRes" component={ViewResultsPage} />
              <Stack.Screen name="dashboard" component={Dashboard} />
              <Stack.Screen name="otp" component={OTPScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        );
    }
}