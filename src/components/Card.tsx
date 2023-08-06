import {  
    Image, 
    Pressable, 
    ImageSourcePropType, 
    StyleSheet 
} from 'react-native';
import React from 'react';


interface IProps {
    onPress: () => void;
    source: ImageSourcePropType;
}

const Card: React.FC<IProps> = ({ onPress, source}: IProps) => {
   
    return (

        <Pressable
            testID='card'
            onPress={onPress}            
            style={styles.cardShadow}
        >
            
            <Image
                testID='card-image'
                source={source}
                style={{
                    width: 80,
                    height: 150,
                    resizeMode: 'cover',
                }}
            />
        </Pressable>
    );
};

export default Card;

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: '#fff',
        elevation: 5,
    },
});


