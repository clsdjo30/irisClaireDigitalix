import { GlobalStore } from 'react-native-global-state-hooks';

const UserStore = new GlobalStore({
    firstname: '',
    birthday: '',
    genre: '',
    lastname: '',
    email: '',
    password: '',
    isagree: false,
    zodiacname: '',
    stone: '',
    element: '',
    freeCoins: 0,
    buyCoins: 0,


});

export const useUserStore = UserStore.getHook();

