import React , { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { LoginButton, AccessToken, LoginManager, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';

export default function Login(props) {
  const [displayError, setDisplayError] = useState(false);
  const [errorText, setErrorText] = useState(false);

  function errorHandler(error){
    setDisplayError(true);
    setErrorText(error)
    setTimeout(()=>{
      setDisplayError(false);
      setErrorText('')
    },5000)
  }

  function handleFacebookLogin (login) {
    LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']).then(
      function (result) {
        if (result.isCancelled) {
          errorHandler('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              let accessToken = data.accessToken;
              const responseInfoCallback = (error, result) => {
                if (error) {
                  errorHandler(error);
                } else {
                  login(result)
                }
              }
              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken: accessToken,
                  parameters: {
                    fields: {
                      string: 'email,name,picture'
                    }
                  }
                },
                responseInfoCallback
              );
              new GraphRequestManager().addRequest(infoRequest).start()
            }
          )
        }
      },
      function (error) {
        errorHandler(error);
      }
    )
  }

  function handleFacebookLogout(logout){
    LoginManager.logOut();
    logout();
  }

  return (
    <View>
      {displayError ? <Text style={{color:'red'}}>{`Login Error: ${errorText}`}</Text> : null}
      <Button
        onPress={props.email ? () => handleFacebookLogout(props.logout): ()=> handleFacebookLogin(props.login)}
        title={props.email ? "Logout" :"Continue with fb"}
        color="#4267B2"
      />
    </View>

  );
}