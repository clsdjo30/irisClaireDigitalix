import { NativeModules } from 'react-native';
import { GlobalStore } from 'react-native-global-state-hooks';

const UserStore = new GlobalStore({firstname:'', birthday:'', genre:'',lastname:'', email:'', isagree: false, zodiacname:'', stone:'', symbol:'', element: '', password:''});

export const useUserStore = UserStore.getHook();

