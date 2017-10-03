import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { MapView } from "expo";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Button, Icon } from "react-native-elements";

class MapScreen extends Component {
    static navigationOptions = {
        title: 'Map',
        tabBarIcon:({ tintColor})=>(
            <Icon name='my-location' size={30} color={tintColor}/>
        )
    }

    state = {
        mapLoaded: false,
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
    };

    componentDidMount() {
        this.setState({ mapLoaded: true });
    }

    onRegionChangeComplete(region) {
        console.log(region);
        this.setState({ region });
    }

    // add a call back function to navigate to deck screen after the jobs are fetched
    onButtonPress() {
        this.props.fetchJobs(this.state.region, () => {
            this.props.navigation.navigate("deck");
        });
    }

    render() {
        if (!this.state.mapLoaded) {
            return (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }
        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 1 }}
                    region={this.state.region}
                    onRegionChangeComplete={this.onRegionChangeComplete.bind(
                        this
                    )}
                />
                <View style={styles.buttonContainerStyle}>
                    <Button
                        large
                        title="Search This Area"
                        backgroundColor="#009688"
                        icon={{ name: "search" }}
                        onPress={this.onButtonPress.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
    buttonContainerStyle: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0
    }
};
export default connect(null, actions)(MapScreen);