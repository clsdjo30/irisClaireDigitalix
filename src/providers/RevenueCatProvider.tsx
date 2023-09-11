import { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL, PurchasesPackage } from 'react-native-purchases';
import { CustomerInfo } from 'react-native-purchases';
import Constants from 'expo-constants';

// Use your RevenueCat API keys
const APIKeys = {
    ios: 'IOS_REVENUECAT_API_KEY',
    google: Constants.expoConfig?.extra?.googleRevenueCatApiKey
};

interface RevenueCatProps {
    purchasePackage?: (pack: PurchasesPackage) => Promise<void>;
    restorePermissions?: () => Promise<CustomerInfo>;
    user: UserState;
    packages: PurchasesPackage[];
}

export interface UserState {
    //TODO: add user state to FireStore
    irisCoin: number;
}

const RevenueCatContext = createContext<RevenueCatProps | null>(null);

// Export context for easy usage
export const useRevenueCat = () => {
    return useContext(RevenueCatContext) as RevenueCatProps;
};

//Provide REvenueCat context to the app
export const RevenueCatProvider = ({ children }: any) => {
    const [user, setUser] = useState<UserState>({
        irisCoin: 0,
    });
    const [packages, setPackages] = useState<PurchasesPackage[]>([]);
    const [isREady, setIsReady] = useState(false);

    useEffect(() => {
        const init = async () => {
            if (Platform.OS === 'android') {
                await Purchases.configure({ apiKey: APIKeys.google })
            }
            setIsReady(true);

            Purchases.setLogLevel(LOG_LEVEL.DEBUG);

            Purchases.addCustomerInfoUpdateListener(async (info) => {
                updateCustomerInformation(info);
            });

            await loadOfferings();
        };
        init();
    }, []);

    //Load all offering that a user can purchase
    const loadOfferings = async () => {
        const offerings = await Purchases.getOfferings();

        // console.log('RevenueCatProvider.tsx: offerings: ', offerings);
        const currentOffering = offerings.current;
        if (currentOffering) {
            // console.log('RCurrentOffering: ', currentOffering.availablePackages[0].product);
            setPackages(currentOffering.availablePackages);
        }
    };


    //Purchase a package
    const purchasePackage = async (pack: PurchasesPackage) => {
        try {
            await Purchases.purchasePackage(pack);

            // Directly add our consumable product
            //TODO: load purchased items from RevenueCat to user account FireStore
            if (pack.product.identifier === 'iris_app_199_1_iris_consume') {
                setUser({ ...user, irisCoin: (user.irisCoin += 1) });
            }
            // else if (pack.product.identifier === 'iris_app_399_3_iris_consume') {
            //     setUser({ ...user, irisCoin: (user.irisCoin += 3) });
            // } else if (pack.product.identifier == 'iris_app_599_5_iris_consume') {
            //     setUser({ ...user, irisCoin: (user.irisCoin += 5) })
            // }

        } catch (e: any) {
            if (!e.userCancelled) {
                alert(e);
            }
        }
    };

    //update user state based on previous purchases
    const updateCustomerInformation = async (customerInfo: CustomerInfo) => {
        const newUser: UserState = { irisCoin: user.irisCoin};    
        setUser(newUser);
    };

    //Restore previous purchases
    const restorePermissions = async () => {
        const customer = await Purchases.restorePurchases();
        console.log('CUSTOMER: ', customer);
        return customer;
    };

    const value = {
        purchasePackage,
        restorePermissions,
        user,
        packages,
    };

    // return empty fragment if provider is not ready (Purchase not yet initialiyzed)
    if (!isREady) {
        return <></>;
    }

    return <RevenueCatContext.Provider value={value}>{children}</RevenueCatContext.Provider>;
}
