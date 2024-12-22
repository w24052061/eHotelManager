import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboard from '../components/AdminPanel/Dashboard';
import RoomManagement from '../components/AdminPanel/RoomManagement';
import ComplaintManagement from '../components/AdminPanel/ComplaintManagement';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Room Management" component={RoomManagement} />
      <Drawer.Screen name="Complaint Management" component={ComplaintManagement} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;