import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 50,
    marginBottom: 20,
    color: 'black',
  },
  textBlack: {
    color: 'black',
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  // option: {
  //   alignItems: 'center',
  // },
  optionImage: {
    width: 200,
    height: 100,
  },
  optionText: {
    marginTop: 10,
    color:'black',
    fontSize:30,
    paddingRight:20
  },
  input: {
    width: '80%',
    height: 40,
    color: 'black',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor:'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  heading: {
    fontSize: 40,
    marginBottom: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});