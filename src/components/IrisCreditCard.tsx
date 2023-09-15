import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './IrisCreditCard.styles';

interface CreditCardProps {
    colors: string[];
    price: number;
    discount?: number;
    bestDeal?: boolean;
    onPress: () => void;
    creditAmount?: number;
    promoPrice?: number;
}

const CreditCard: React.FC<CreditCardProps> = ({ colors, creditAmount, price, promoPrice, bestDeal, onPress }) => {
    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            locations={[0.1, 0.9]}
            style={styles.domainCard}
        >
            <Pressable
                style={styles.pressableCard}
                onPress={onPress}
            >
                <View style={styles.priceBlock}>
                    <Text style={styles.priceText}>{creditAmount}</Text>
                    <Text style={styles.priceSubText}>Crédit</Text>
                </View>
                {bestDeal && (
                    <View style={styles.bestDeal}>
                        <Text style={styles.bestDealText}>Best Deal</Text>
                    </View>
                )}
                <View style={styles.domainTextBlock}>
                    {promoPrice && (
                        <View style={styles.promoBlock}>
                            <Text style={styles.pricePromo}>{promoPrice}</Text>
                            <View style={styles.bestOffer}>
                                <Text style={styles.bestOfferText}>-13%</Text>
                            </View>
                        </View>
                    )}
                    <Text style={styles.price}>{price}€</Text>
                </View>
            </Pressable>
         </LinearGradient>
    );
};

export default CreditCard;
