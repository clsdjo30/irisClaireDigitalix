import { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Purchases, { LOG_LEVEL, PurchasesPackage } from 'react-native-purchases';
import { CustomerInfo } from 'react-native-purchases';
import { useUserInformation } from '../hooks/useUserInformations';
import Constants from 'expo-constants';

// Use your RevenueCat API keys
const APIKeys = {
    ios: 'IOS_REVENUECAT_API_KEY',
    google: Constants.expoConfig?.extra?.googleRevenueCatApiKey
};

interface RevenueCatProps {
    purchasePackage?: (pack: PurchasesPackage) => Promise<void>;
    restorePermissions?: () => Promise<CustomerInfo>;
    user: UserInfo;
    updateUserIrisCoins: (newIrisCoins: number) => Promise<void>;
    packages: PurchasesPackage[];
}

interface UserInfo {
    birthday: string;
    email: string;
    firstname: string;
    zodiacname: string;
    stone: string;
    genre: string;
    element: string;
    irisCoins: number;
    hasSeenModal: boolean;
}

const RevenueCatContext = createContext<RevenueCatProps | null>(null);

// Export context for easy usage
export const useRevenueCat = () => {
    return useContext(RevenueCatContext) as RevenueCatProps;
};

//Provide REvenueCat context to the app
export const RevenueCatProvider = ({ children }: any) => {
    const { user, updateUserIrisCoins, fetchUser } = useUserInformation();
    const [packages, setPackages] = useState<PurchasesPackage[]>([]);
    const [isREady, setIsReady] = useState(false);

    useEffect(() => {
        const init = async () => {
            if (Platform.OS === 'android') {
                await Purchases.configure({ apiKey: APIKeys.google })
            }
            setIsReady(true);

            Purchases.setLogLevel(LOG_LEVEL.DEBUG);

            // Purchases.addCustomerInfoUpdateListener((customerInfo: CustomerInfo) => {
            //     updateCustomerInformation(customerInfo);
            // });

            

            await loadOfferings();
        };
        init();
    }, []);

    //Load all offering that a user can purchase
    const loadOfferings = async () => {
        const offerings = await Purchases.getOfferings();

        //console.log('RevenueCatProvider.tsx: offerings: ', offerings.all.basic.availablePackages);
        const currentOffering = offerings.current;
        if (currentOffering) {
            //console.log('RCurrentOffering: ', currentOffering.availablePackages[0].product);
            setPackages(currentOffering.availablePackages);
        }
    };


    //Purchase a package
    const purchasePackage = async (pack: PurchasesPackage) => {
        try {
            await Purchases.purchasePackage(pack);

            // Directly add our consumable product
            //TODO: load purchased items from RevenueCat to user account FireStore
            if (pack.product.identifier === 'test_1_credit_199_consume') {
               updateUserIrisCoins(user.irisCoins += 1);
            }
            else if (pack.product.identifier === 'test_3_credits_6.99_consume') {
                updateUserIrisCoins(user.irisCoins += 3);
            }
            //Ajouter les autres produits consommables ici

            fetchUser();

        } catch (e: any) {
            if (!e.userCancelled) {
                alert(e);
            }
        }
    };

    //update user state based on previous purchases
    // const updateCustomerInformation = async (customerInfo: CustomerInfo) => {
    //   fetchUser();
    // };

    //Restore previous purchases
    const restorePermissions = async () => {
        const customer = await Purchases.restorePurchases();
        console.log('CUSTOMER: ', customer);
        return customer;
    };
    

    const value = {
        purchasePackage,
        restorePermissions: async () => {
            const customer = await Purchases.restorePurchases();
            console.log('CUSTOMER: ', customer);
            return customer;
        },
        user,
        packages,
        updateUserIrisCoins
    };

    // return empty fragment if provider is not ready (Purchase not yet initialiyzed)
    if (!isREady || !user) {
        return <></>;
    }

    return <RevenueCatContext.Provider value={value}>{children}</RevenueCatContext.Provider>;
}
