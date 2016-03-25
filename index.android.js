/**
* Sample React Native App
* https://github.com/facebook/react-native
*/

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';

class EmbeddedApp extends Component {
    constructor(props){
        super(props);

        this.state = {
            text: 'Welcome to React Native!'
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {this.state.text}
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Shake or press menu button for dev menu
                </Text>
            </View>
        );
    }

    componentDidMount() {
        React.NativeModules.RNIntentModule.getDataFromIntent(
            successMsg => this.setState({text: successMsg}),
            errorMsg => this.setState({text: errorMsg})
       );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('EmbeddedApp', () => EmbeddedApp);
