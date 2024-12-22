import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../components/RoomManagement/HomePage';
import BookingHistory from '../components/RoomManagement/BookingHistory';
import ComplaintPage from '../components/Complaint/ComplaintPage';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Bookings" component={BookingHistory} />
      <Tab.Screen name="Complaints" component={ComplaintPage} />
    </Tab.Navigator>
  );
};

export default TabNavigator;