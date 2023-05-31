import {  Image, Dimensions, Pressable, ImageSourcePropType } from 'react-native';
import React from 'react';


interface IProps {
    onPress: () => void;
    source: ImageSourcePropType;
}

const Card: React.FC<IProps> = ({ onPress, source}: IProps) => {
    const PAGE_WIDTH = Dimensions.get('window').width;
    const itemWidth = 80;
    const centerOffset = PAGE_WIDTH / 2 - itemWidth / 2;


    return (
        <Pressable
            onPress={onPress}

        >
            <Image
                source={source}
                style={{
                    width: 180,
                    height: 240,
                    resizeMode: 'contain',
                }}
            />
        </Pressable>
    );
};

export default Card;


