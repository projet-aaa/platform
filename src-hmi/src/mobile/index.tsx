import * as React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import TextView from "./testView"

interface Props {

}

interface State {

}

export default class App extends React.Component<Props, State> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Welcome to React Native!
                    This my own app!
                </Text>
                <TextView/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
})