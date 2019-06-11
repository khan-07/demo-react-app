import React from 'react';
import { StyleSheet, Text, TextInput , View, Button, TouchableOpacity} from 'react-native';
import {SecureStore} from 'expo';

import * as Permissions from 'expo-permissions'
import * as TaskManager from 'expo-task-manager'
import {Location} from 'expo';

const BACKGROUND_UPDATE ='BACKGROUND_LOCATION_UPDATE';

TaskManager.defineTask(BACKGROUND_UPDATE, async ({ data: { locations }, error }) => {
    console.log('Sending Location')
    //below is the code for sending location in background

    const token = await SecureStore.getItemAsync('Token');

    fetch('http://192.168.0.38:8000/location/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Token ' + token
        },
        body: JSON.stringify({
            alt: locations[0].coords.altitude,
            lat: locations[0].coords.latitude,
            lng: locations[0].coords.longitude,
        }),
    }).then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });

});


export default class AddNote extends React.Component {
    state = {
        input: '',

    };

    componentWillMount() {



        console.log('Component Moutning')
        this._getLocationAsync();

    }

    _getLocationAsync = async () => {
        let providerStatus = await Location.getProviderStatusAsync();
        console.log('Component Moutning')
        if (!providerStatus.locationServicesEnabled) {
            this.setState({
                errorMessage: 'Location Services Disabled'
            })
            return;
        }

        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
            return
        }
        // accuracy: Location.Accuracy.BestForNavigation
        Location.startLocationUpdatesAsync(BACKGROUND_UPDATE, { accuracy: Location.Accuracy.BestForNavigation})
        // let location = await Location.getCurrentPositionAsync({});
        // this.setState({ location });
    };

    render() {
        return (

            <View style={styles.container}>
                <Text> Add Note</Text>
                <TextInput
                    style={{fontWeight: 'bold', marginBottom:20,marginTop:20,borderColor:'gray',width:'60%',borderWidth:1,maxHeight:80}}
                    autoGrow = {true}
                    multiline
                    onChangeText={(text) => this.setState({input: text})}
                    value={this.state.input}

                />
                <Button
                    style ={{marginBottom:30, width:30}}
                    title="Submit"
                    onPress={async () => {
                        const token = await SecureStore.getItemAsync('Token');
                        // console.log('Hello')
                        fetch('http://192.168.0.38:8000/note/', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                Authorization: 'Token ' + token
                            },
                            body: JSON.stringify({
                                note: this.state.input
                            }),
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                if (responseJson.message =='success'){

                                    this.setState({input:''})

                                }
                            }).catch((error) => {
                            console.error(error);
                        });

                        }
                    }
                />


                <TouchableOpacity
                   style={{alignItems: 'center',backgroundColor: '#DDDDDD',padding: 10,marginTop:20}}
                   onPress = {()=>{this.props.navigation.navigate('ViewNotes')}}
                >
                    <Text> View Notes </Text>

                </TouchableOpacity>
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
