import React, { Component } from "react";
import { View, Text, ScrollView, Linking, Platform } from "react-native";
import { Button, Card, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { MapView } from "expo";

class ReviewScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Review Jobs",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="favorite" size={30} color={tintColor} />
            ),
            headerRight: (
                <Button
                    title="Settings"
                    onPress={() => navigation.navigate("settings")}
                    backgroundColor="rgba(0,0,0,0)"
                    color="rgba(0,122,255,1)"
                />
            )
        };
    };

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            const { longitude, latitude } = job;

            const initialRegion = {
                longitude,
                latitude,
                latitudeDelta: 0.045,
                longitudeDelta: 0.02
            };

            return (
                <Card title={job.jobtitle} key={job.jobkey}>
                    <View style={{ height: 200 }}>
                        <MapView
                            scrollEnabled={false}
                            style={{ flex: 1 }}
                            cacheEnabled={Platform.OS === "andriod"}
                            initialRegion={initialRegion}
                        />

                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{job.company}</Text>
                            <Text style={styles.italics}>
                                {job.formattedRelativeTime}
                            </Text>
                        </View>
                    </View>
                    <Button
                        title="Apply Now!"
                        backgroundColor="#03A9F4"
                        onPress={() => Linking.openURL(job.url)}
                    />
                </Card>
            );
        });
    }

    render() {
        return <ScrollView>{this.renderLikedJobs()}</ScrollView>;
    }
}

const mapStateToProps = state => {
    return {
        likedJobs: state.likeJobs
    };
};

const styles = {
    detailWrapper: {
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-around"
    },

    italics: {
        fontStyle: "italic"
    }
};
export default connect(mapStateToProps)(ReviewScreen);