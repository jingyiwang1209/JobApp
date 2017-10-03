import React, { Component } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Button } from 'react-native-elements';

const SCRENN_WIDTH= Dimensions.get('window').width;


class Slides extends Component {

    renderLastSlide(index){
        if(index === this.props.data.length - 1){
            return (
                <Button buttonStyle={styles.buttonStyle} title='Ready to go!' raised onPress={this.props.onComplete} />
            );
        }
    }

    renderSlides() {
        return this.props.data.map((slide, index) => {
            return (
                <View key={slide.text} style={[styles.viewTagStyle, {backgroundColor:slide.color}]}>
                    <Text style={styles.textStyle}>{slide.text}</Text>
                    {this.renderLastSlide(index)}
                </View>
            );
        });
    }

    render() {
        return (
            <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles={
    textStyle:{
        fontSize:30,
        color:'#fff'
    },

    viewTagStyle:{
        flex:1,
        width:SCRENN_WIDTH,
        justifyContent:'center',
        alignItems:'center'
    },

    buttonStyle:{
        backgroundColor:'#0288d1',
        marginTop:15
    }
}

export default Slides;