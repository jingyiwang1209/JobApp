import React, { Component } from "react";
import { View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager } from "react-native";


const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Swipe extends Component {
    static defaultProps={
        onSwipeRight:()=>{},
        onSwipeLeft:()=>{},
        keyProp:'id'
    }

    constructor(props) {

        super(props);

        const position = new Animated.ValueXY();

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: evt => true,
            onPanResponderMove: (evt, gesture) => {
                // console.log(gesture);
                position.setValue({ x: gesture.dx, y: gesture.dy });
            },

            onPanResponderRelease: (evt, gesture) => {
                if(gesture.dx>SWIPE_THRESHOLD){
                    this.forceSwipeOut('right');
                }else if(gesture.dx<-SWIPE_THRESHOLD){
                    this.forceSwipeOut('left');
                }else{
                    this.resetPosition();
                }

            }
        });
        this.state = { panResponder, position, index:0 };
    }


    componentWillReceiveProps(nextProps){
        if(nextProps.data !== this.props.data){
            this.setState({index: 0})
        }

    }

    componentWillUpdate(){
        // For android
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        //
        LayoutAnimation.spring();
    }


    forceSwipeOut(direction){
        const threshold = direction === 'right' ? SCREEN_WIDTH:-SCREEN_WIDTH;
        Animated.timing(this.state.position, {
            toValue:{
                x:threshold,
                y:0
            },
            duration:SWIPE_OUT_DURATION
        }).start(()=>this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction){
        const { onSwipeLeft, onSwipeRight } = this.props;

        const item = this.props.data[this.state.index];

        direction === 'right'? onSwipeRight(item):onSwipeLeft(item);

        // If we don't do this, then the next card will automatically move off the screen like the previous one
        // since the previous one's final position is automatically applied to the next one.
        this.state.position.setValue({x:0, y:0})

        this.setState({ index: this.state.index + 1})
    }

    resetPosition(){
        Animated.spring(this.state.position, {
            toValue:{x:0, y:0}
        }).start();
    }

    getCardAnimStyle() {
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange:[-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange:['-120deg', '0deg', '120deg']
        });

        return {
            ...this.state.position.getLayout(),
            transform: [{ rotate }]
        };
    }


    renderCards() {
        if(this.state.index >= this.props.data.length){
            return this.props.renderNoMoreCard();
        }

        return this.props.data.map((item, ind) => {
            if (ind < this.state.index) { return null}
            if (ind === this.state.index) {
                return (
                    <Animated.View
                        key={item[this.props.keyProp]}
                        {...this.state.panResponder.panHandlers}
                        style={[this.getCardAnimStyle(), styles.cardStackStype]}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            // Use Animated.View here to avoid card's flashing caused by promoting View to AnimatedView
            return (<Animated.View key={item[this.props.keyProp]} style={[styles.cardStackStype, {top:10*(ind-this.state.index)}]}>{this.props.renderCard(item)}</Animated.View>);
        }).reverse();
    }

    render() {
        return <View>{this.renderCards()}</View>;
    }
}

const styles={
    cardStackStype:{
        position:'absolute',
        width:SCREEN_WIDTH
    }
}

export default Swipe;