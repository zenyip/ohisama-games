import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import CoverPage from './component/CoverPage'
import MenuPage from './component/MenuPage'
import Q_GamePage from './component/Q_GamePage'
import Hi_GamePage from './component/Hi_GamePage'

const Stack = createStackNavigator()

const Navigation = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={CoverPage} />
            <Stack.Screen name="Menu" component={MenuPage} />
            <Stack.Screen name="Game_Q" component={Q_GamePage} />
            <Stack.Screen name="Game_Hi" component={Hi_GamePage} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default Navigation