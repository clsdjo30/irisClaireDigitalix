import { NativeModules, ImageSourcePropType } from 'react-native';
import { GlobalStore } from 'react-native-global-state-hooks';

const DaydrawStore = new GlobalStore({daycard:'',daycardimage:'' as ImageSourcePropType , daycardbackimage: ""  as ImageSourcePropType, daytendance:'', isdraw: false, });

export const useDaydrawStore = DaydrawStore.getHook();