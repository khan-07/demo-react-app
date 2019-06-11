import React, { Component } from 'react';
import { AppRegistry, View, Text, Button, TextInput} from 'react-native';
import {SecureStore} from "expo";

export default  class ViewNotes extends Component {
    constructor(props){
        super(props);
        this.state = {
            textInput : []
        }
    }
    addTextInput = (key,text) => {
        let textInput = this.state.textInput;
        textInput.push(<TextInput value={text} key={key} />);
        this.setState({ textInput })
    }

    async componentWillMount() {
        // for (let i =0; i <3; i++){
        //     this.addTextInput(this.state.textInput.length)
        // }


        const token = await SecureStore.getItemAsync('Token');


        console.log('This is my token ' + token);

        fetch('http://192.168.0.38:8000/note/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Token ' + token
            }
        }).then((response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.message == 'success'){
                    const data = JSON.parse(responseJson.data)
                    console.log(data.length);
                     for (let i =0; i <data.length; i++){
                         let text = (i+1) + '-     ' + data[i].fields.note;
                         this.addTextInput(this.state.textInput.length, text)
                    }


                }

            }).catch((error) => {
            console.error(error);
        });
    }

    render(){
        return(
            <View>
                {/*<Button title='+' onPress={() => this.addTextInput(this.state.textInput.length)} />*/}
                {this.state.textInput.map((value, index) => {
                    return value
                })}
            </View>
        )
    }
}