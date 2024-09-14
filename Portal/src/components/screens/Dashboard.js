import React from 'react';
import {  View, StyleSheet, ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import RequestScreen from './ExtraMains/RequestScreen';
//import CalendarScreen from './CalenderScreen';
import FormScreen from './ExtraMains/FormScreen';
import AdminProfileScreen from './ExtraMains/AdminProfileScreen';
import AdminNotificationsScreen from './ExtraMains/AdminNotificationsScreen';
import bang from '../../../assets/bang.jpg'

const Tab = createBottomTabNavigator();

const Dashboard = () => {
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
            } else if (route.name === 'Request') {
              iconName = 'person-add';
            } else if (route.name === 'Notifications') {
              iconName = 'notifications';
            } else if (route.name === 'Forms') {
              iconName = 'calendar-outline';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'rgba(155, 0, 80, 0.8)',
          tabBarInactiveTintColor: 'rgba(0, 0, 255, 0.8)',
          tabBarStyle: styles.tabBar,
        })}
      >
        <Tab.Screen name="Request" component={RequestScreen} />
        <Tab.Screen name="Forms" component={FormScreen}/>
        <Tab.Screen name="Notifications" component={AdminNotificationsScreen} options={{headerShown:false, headerTransparent:true}}/>
        <Tab.Screen name="Profile" component={AdminProfileScreen} options={{headerShown:false, headerTransparent:true}} />
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

export default Dashboard;