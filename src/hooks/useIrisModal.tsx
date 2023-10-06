import { useState } from 'react';
import { useUserInformation }  from './useUserInformations';

const useIrisModal = ( navigation: any, route: () => void) => {
    const userInformation = useUserInformation();
    const possessedIris = userInformation.user?.irisCoins;
    const [isIrisModalVisible, setIrisModalVisible] = useState(false);

    const goToCrossDrawUpdated = () => {
        if (possessedIris < 3) {
            setIrisModalVisible(true);
        } else {
            route();
        }
    };

    const goToYesDrawUpdated = () => {
        if (possessedIris < 1) {
            setIrisModalVisible(true);
        } else {
            route();
        }
    };

    const cancelModal = () => {
        navigation.navigate('Home');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    const goBuyIris = () => {
        navigation.navigate('Iris');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Iris' }],
        });
    }

    return {
        possessedIris,
        isIrisModalVisible,
        setIrisModalVisible,
        goToCrossDrawUpdated,
        goToYesDrawUpdated,
        cancelModal,
        goBuyIris
    };
};

export default useIrisModal;
