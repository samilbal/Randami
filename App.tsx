import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import StackNavigator from './src/navigation/StackNavigator';
import {useTheme} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from './src/redux/store';

function App(): JSX.Element {
  const theme = useTheme();
  theme.colors.secondaryContainer = 'transparent';
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
