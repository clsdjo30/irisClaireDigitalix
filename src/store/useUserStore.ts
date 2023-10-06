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
    irisCoins: 0, 
    hasSeenModal: true,
    isEmailVerified: false,
    isCoinAdded: false,
});

export const useUserStore = UserStore.getHook();

