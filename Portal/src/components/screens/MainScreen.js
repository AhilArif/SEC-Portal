import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, ImageBackground } from 'react-native';
//import LinearGradient from 'react-native-linear-gradient';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import SearchScreen from './SearchScreen';
import AddScreen from './AddScreen';
import CalenderScreen from './CalenderScreen';
import bang from '../../../assets/bang.jpg'
import NotificationScreen from './Notification';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <ImageBackground
      style={styles.background}
      source={bang} // Replace with your background image URL
    >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Search') {
              iconName = 'search';
            } else if (route.name === 'Add') {
              iconName = 'cloud-upload-outline';
            } else if (route.name === 'Calender') {
              iconName = 'calendar';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            } else if (route.name === 'Notification') {
              iconName = 'notifications';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'rgba(155, 0, 80, 0.8)',
          tabBarInactiveTintColor: 'rgba(0, 0, 255, 0.8)',
          tabBarStyle: styles.tabBar,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{headerTitle:'',headerTransparent:true}} />
        <Tab.Screen name="Search" component={SearchScreen} options={{headerTitle:'',headerTransparent:true}} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="Calender" component={CalenderScreen} />
        <Tab.Screen name='Notification' component={NotificationScreen} options={{headerTitle:'', headerTransparent:true}} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{headerTitle:'',headerTransparent:true}} />
      </Tab.Navigator>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    borderTopWidth: 0,
    elevation: 0,
    borderColor: 'white',
    borderWidth: 5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
  },
  tabBarBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  mirrorEffect: {
    position: 'absolute',
    bottom: -70,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    transform: [{ scaleY: -1 }],
    opacity: 0.5,
  },
});

export default MainScreen;
