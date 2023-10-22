import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React, {useState} from 'react';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/COLORS';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Tab = createMaterialBottomTabNavigator();

const MaterialBottomNavigator = () => {
  const [color, setColor] = useState('');

  const onStateChange = e => {
    const currentRoute = e.data.state.routeNames[e.data.state.index];
    switch (currentRoute) {
      case 'Home':
        setColor(COLORS.secondary);
        break;
      case 'Favorites':
        setColor(COLORS.popDark);
        break;
      default:
        setColor(COLORS.primary);
    }
  };

  return (
    <Tab.Navigator
      screenListeners={{
        state: onStateChange,
      }}
      labeled={true}
      activeColor={COLORS.buttonFocused}
      inactiveColor={COLORS.buttonUnfocused}
      initialRouteName="Home"
      shifting={true}
      barStyle={{
        backgroundColor: color,
      }}
      sceneAnimationEnabled={true}>
      <Tab.Screen
        key={0}
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: (
            <Text
              style={{
                fontFamily: 'PixelifySans-Bold',
                fontSize: 18,
                color: 'white',
              }}>
              Home
            </Text>
          ),
          tabBarIcon: ({color, focused}) => {
            return (
              <Icon
                name={focused ? 'home' : 'home-outline'}
                size={22}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarLabel: (
            <Text
              style={{
                fontFamily: 'PixelifySans-Bold',
                fontSize: 18,
                color: 'white',
              }}>
              Favorites
            </Text>
          ),
          tabBarIcon: ({color, focused}) => {
            return (
              <Icon
                name={focused ? 'heart' : 'heart-outline'}
                size={22}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MaterialBottomNavigator;
