import React from 'react';
import { View, Text } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { styles } from './BuyIrisScreen.styles';
import CreditCard from '../../../components/IrisCreditCard';
import { colors } from '../../../theme/color';

const BuyIrisScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
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
            <View style={styles.domainsContainer}>
                <CreditCard
                    colors={[colors.palette.violetClair, colors.palette.violetBg]}
                    creditAmount={1}
                    price={1.99}
                />
                <CreditCard
                    colors={[colors.palette.violetClair, colors.palette.violetBg]}
                    creditAmount={3}
                    price={4.99}
                    promoPrice={6.00}
                />
                <CreditCard
                    colors={[colors.palette.orange, colors.palette.violetBg]}
                    creditAmount={10}
                    price={15.99}
                    bestDeal={true}
                />
                <CreditCard
                    colors={[colors.palette.violetClair, colors.palette.violetBg]}
                    creditAmount={20}
                    price={28.99}
                />
                <CreditCard
                    colors={[colors.palette.violetClair, colors.palette.violetBg]}
                    creditAmount={30}
                    price={39.99}
                />
            </View>
        </View>
    );
}

export default BuyIrisScreen;
