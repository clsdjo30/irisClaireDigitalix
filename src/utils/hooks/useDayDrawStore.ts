import { NativeModules } from 'react-native';
import { GlobalStore } from 'react-native-global-state-hooks';

const DaydrawStore = new GlobalStore({daycard:'', daytendance:'', isdraw: false, });

export const useDaydrawStore = DaydrawStore.getHook();