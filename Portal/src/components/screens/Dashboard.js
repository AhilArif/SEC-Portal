import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import RequestScreen from './ExtraMains/RequestScreen';
//import CalendarScreen from './CalenderScreen';
import FormScreen from './ExtraMains/FormScreen';
import AdminProfileScreen from './ExtraMains/AdminProfileScreen';

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Request') {
            iconName = 'person-add';
          } else if (route.name === 'Add') {
            iconName = 'add-circle';
          } else if (route.name === 'Forms') {
            iconName = 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'rgba(0, 0, 255, 0.8)',
        inactiveTintColor: 'black',
        style: {
          display: 'flex',
        },
      }}
    >
        <Tab.Screen name="Request" component={RequestScreen} />
        <Tab.Screen name="Forms" component={FormScreen}/>
        <Tab.Screen name="Profile" component={AdminProfileScreen} />
    </Tab.Navigator>
  );
};

export default Dashboard;