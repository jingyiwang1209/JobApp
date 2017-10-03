import { AsyncStorage } from "react-native";
import { Facebook } from "expo";
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from "./types";

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem("fb_token");
    if (token) {
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        doFacebookLogin(dispatch);
    }
};

const doFacebookLogin = async dispatch => {
    const {
        type,
        token
    } = await Facebook.logInWithReadPermissionsAsync("814957378691133", {
        permissions: ["public_profile"]
    });

    if (type === "success") {
        await AsyncStorage.setItem( "fb_token", token );
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL });
    }
};