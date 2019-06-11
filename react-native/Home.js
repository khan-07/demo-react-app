import React from 'react';
import { StyleSheet, Text, View, Button,TextInput } from 'react-native';
import * as SecureStore from 'expo-secure-store';;


export default class Home extends React.Component {
    test(response,object){
        console.log('Heldfddfo')
        if (1){
            object.navigate('AddNote')
        }

    }

    render() {

        return (
            <View style={styles.container}>
                <Text style ={{fontWeight:'bold',color:'blue'}}>Username</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop:10,width:'50%' }}
                    // onChangeText={(text) => this.setState({text})}
                    // value={this.state.text}
                    onChangeText={(text) => this.setState({username: text})}
                />
                <Text style ={{fontWeight:'bold',color:'blue'}} >Password</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, marginTop:10,width:'50%',marginBottom: 20 }}
                    // onChangeText={(text) => this.setState({text})}
                    //  value={this.state.text}
                    onChangeText={(text) => this.setState({password: text})}

                    secureTextEntry={true}
                />
                <Button
                    style={{marginTop:20}}
                    title="Login"
                    color="#841584"
                    onPress= {() =>{
                        fetch('http://192.168.0.38:8000/token/', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                username: this.state.username,
                                password: this.state.password,
                            }),
                        }).then((response) => response.json())
                            .then(async (responseJson) => {
                                if (responseJson.message == 'success'){
                                    await SecureStore.setItemAsync('Token',responseJson.token);
                                    this.props.navigation.navigate('AddNote')


                                }

                            }).catch((error) => {
                            console.error(error);
                        });


                    }

                    }



                    accessibilityLabel="Login To save Notes"
                />
            </View>
        );


    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});





