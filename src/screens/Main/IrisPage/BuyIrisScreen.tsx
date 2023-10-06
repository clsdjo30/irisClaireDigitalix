import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { styles } from './BuyIrisScreen.styles';
import IrisCreditCard from '../../../components/IrisCreditCard';
import { colors } from '../../../theme/color';
import { useRevenueCat } from '../../../providers/RevenueCatProvider';
import { PurchasesPackage } from 'react-native-purchases';



const BuyIrisScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const { user, packages, purchasePackage } = useRevenueCat();

    const onPurchase = (pack: PurchasesPackage) => {
        // Purchase the package
        purchasePackage!(pack);

    };

    const renderItem = ({ item }: { item: any }) => {
        const { product } = item;
        const bestDeal = product.price === 6.99;

        return (
            <IrisCreditCard
                colors={bestDeal ? [colors.palette.orange, colors.palette.violetBg] : [colors.palette.violetClair, colors.palette.violetBg]}
                creditAmount={product.description}
                price={product.price} // Assurez-vous que le prix est au bon format
                onPress={() => onPurchase(item)}
                bestDeal={bestDeal}
            // Ajoutez d'autres props si nécessaire
            />
        );
    };

   //console.log('RENDERITEM: ', packages)
    return (
        
            <View style={styles.container}>
                <View style={styles.header} />
                <View style={styles.titleCredit}>
                    <View style={styles.explainCredit}>
                        <Text style={styles.contentTitle}>Credits</Text>
                        <Text style={styles.textCredit}>1 Crédit = 1 Question Oui/Non</Text>
                        <Text style={styles.textCredit}>3 Crédits = 1 Tirage Complet</Text>
                    </View>
                </View>
                <View style={styles.flatList}>
                    <FlatList
                        data={packages}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.contentContainer}
                        snapToEnd={false}
                        decelerationRate={0.6}

                    />
                </View>
            </View>
    );
}

export default BuyIrisScreen;
