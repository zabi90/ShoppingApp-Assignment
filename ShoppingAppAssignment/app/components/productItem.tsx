import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { Product } from '../data/productSlice';
import CounterView from './Counter';

type ItemProps = {
    product: Product,
    updateItemQuantity: (product: Product, quantity: number) => void,
};

const ProductItem = ({ product, updateItemQuantity }: ItemProps) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: product.img }} style={styles.image} />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>Price: ${product.price}</Text>
            <CounterView cartQuantity={product.quantity} addItem={(newQuantity) => {
                updateItemQuantity(product, newQuantity)
            }} removeItem={(newQuantity) => {
                updateItemQuantity(product, newQuantity)
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default ProductItem