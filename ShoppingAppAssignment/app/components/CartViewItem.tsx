import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import CounterView from './Counter';
import { CartItem } from '../data/cartSlice';

type ItemProps = {
    cart: CartItem,
    updateItemQuantity: (cart: CartItem, quantity: number) => void,
};

const CartViewItem = ({ cart, updateItemQuantity }: ItemProps) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: cart.img }} style={styles.image} />
            <View>
                <Text style={styles.name}>{cart.name}</Text>
                <Text style={styles.price}>Total : X {cart.quantity} = {cart.price * cart.quantity}.$</Text>
                <CounterView cartQuantity={cart.quantity} addItem={(newQuantity) => {
                    updateItemQuantity(cart, newQuantity)
                }} removeItem={(newQuantity) => {
                    updateItemQuantity(cart, newQuantity)
                }} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 8,
        marginTop: 8,
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginStart: 8,
        marginEnd: 8,
        color : 'black'
    },
    price: {
        fontSize: 16,
        marginStart: 8,
        marginEnd: 8,
        color : 'black'
    },
});

export default CartViewItem