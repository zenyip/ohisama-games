import React from 'react'
import { Provider } from 'react-redux'
import { enableScreens } from 'react-native-screens'
import store from './store'
import Navigation from './src/Navigation'

enableScreens()

const App = () => {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    );
}

export default App
