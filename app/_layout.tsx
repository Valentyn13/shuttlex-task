import { Provider } from 'react-redux';
import { Slot } from 'expo-router';

import { SocketProvider } from '../src/context/socket';

import { store } from '@store/index';

const TabsLayout = () => {
    return (
        <Provider store={store.instance}>
            <SocketProvider>
                <Slot />
            </SocketProvider>
        </Provider>
    );
};

export default TabsLayout;
