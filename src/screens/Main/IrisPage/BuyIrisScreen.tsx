import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { styles } from './BuyIrisScreen.styles';
import IrisCreditCard from '../../../components/IrisCreditCard';
import { colors } from '../../../theme/color';
import { useRevenueCat } from '../../../providers/RevenueCatProvider';
import { PurchasesPackage } from 'react-native-purchases';

interface CreditCardData {
    colors: string[];
    title: string;
    description: string;
    price: number;
    creditAmount: number;
    onPress: () => void;
    bestDeal?: boolean;
    discount?: number;
}

const BuyIrisScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    // const { user, packages, purchasePackage } = useRevenueCat();

    // const onPurchase = (pack: PurchasesPackage) => {
    //     // Purchase the package
    //     purchasePackage!(pack);

    // };

    //CODE pour le test
    const data: CreditCardData[] = [
        {
            colors: [colors.palette.violetClair, colors.palette.violetBg],
            title: 'Titre 1',
            description: 'Description 1',
            price: 10,
            creditAmount: 10,
            onPress: () => console.log('Pressed 1'),
        },
        {
            colors: [colors.palette.violetClair, colors.palette.violetBg],
            title: 'Titre 2',
            description: 'Description 2',
            price: 20,
            creditAmount: 200,
            onPress: () => console.log('Pressed 2'),
        },
        {
            colors: [colors.palette.orange, colors.palette.violetBg],
            title: 'Titre 3',
            description: 'Description 3',
            price: 25,
            bestDeal: true,
            discount: 30,
            creditAmount: 100,
            onPress: () => console.log('Pressed 3'),
        },
        {
            colors: [colors.palette.violetClair, colors.palette.violetBg],
            title: 'Titre 4',
            description: 'Description 4',
            price: 40,
            creditAmount: 200,
            onPress: () => console.log('Pressed 4'),
        },
        {
            colors: [colors.palette.orange, colors.palette.violetBg],
            title: 'Titre 5',
            description: 'Description 5',
            price: 10,
            creditAmount: 100,
            onPress: () => console.log('Pressed 5'),
        },
        {
            colors: [colors.palette.violetClair, colors.palette.violetBg],
            title: 'Titre 6',
            description: 'Description 6',
            price: 20,
            creditAmount: 200,
            onPress: () => console.log('Pressed 6'),
        },
        {
            colors: [colors.palette.violetClair, colors.palette.violetBg],
            title: 'Titre 7',
            description: 'Description 7',
            price: 20,
            creditAmount: 200,
            onPress: () => console.log('Pressed 7'),
        },
        // Ajoutez plus d'éléments ici
    ];

    const renderItem = ({ item }: { item: CreditCardData }) => (
        <IrisCreditCard
            colors={item.colors}
            title={item.title}
            description={item.description}
            price={item.price}
            bestDeal={item.bestDeal}
            promoPrice={item.discount}
            creditAmount={item.creditAmount}
            onPress={item.onPress}
        />
    );
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
                    data={data}
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
