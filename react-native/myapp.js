import React from 'react';
import AppNav from './AppNavigator';
import { Platform } from 'react-native';

import {TaskManager} from "expo";
const BACKGROUND_UPDATE ='BACKGROUND_LOCATION_UPDATE';

TaskManager.defineTask(BACKGROUND_UPDATE, async ({ data: { locations }, error }) => {
    fetch('http://192.168.0.38:8000/location/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // Authorization: 'Token ' + token
        },
        body: JSON.stringify({
            location: 'hi there'
        }),
    }).then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });

});

export default class App extends React.Component {
    componentWillMount() {
        if (Platform.OS === 'android') {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let providerStatus = await Location.getProviderStatusAsync();
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

        Location.startLocationUpdatesAsync(BACKGROUND_UPDATE, { accuracy: Location.Accuracy.Low })
        // let location = await Location.getCurrentPositionAsync({});
        // this.setState({ location });
    };

    render() {
        return (
            <AppNav/>
        );
    }
}