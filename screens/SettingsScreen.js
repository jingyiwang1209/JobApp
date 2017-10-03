import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import * as actions from '../actions';

class SettingScreen extends Component {
    render(){
        return(
            <View>
              <Button
                title='Reset Liked Jobs'
                large
                icon={{name: 'delete-forever'}}
                backgroundColor='#F44336'
                onPress={()=>this.props.clearJobs()}
                />
            </View>

        )
    }
}

export default connect(null, actions)(SettingScreen);