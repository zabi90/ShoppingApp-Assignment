import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    View,
    Image
} from 'react-native';
import CartViewItem from '../../components/CartViewItem'
import { useAppDispatch, useAppSelector } from '../../data/Store';
import { CartItem } from "../../data/cartSlice";
import { getCartItems, addCartItem } from '../../data/cartSlice'

const CartList = () => {

    const dispatch = useAppDispatch();
    const cartState = useAppSelector(state => state.cart)

    useEffect(()=>{
        dispatch(getCartItems())
    },[dispatch])
    return (
        <View style={styles.container}>
        <FlatList
            ListEmptyComponent = {() => <Text style={styles.emptyCartHeading}>Please add item into cart.</Text>}
            data={cartState.cartItems}
            renderItem={({ item }) => <CartViewItem cart={item} updateItemQuantity={(product : CartItem, quantity : number)=>{

                dispatch(addCartItem(
                    {
                        id : product.id.toString(),
                        name :product.name,
                        img : product.img,
                        price : product.price,
                        quantity : quantity
                    }
                    ));
            }}/>}
            keyExtractor={item => item.name}
        />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems : 'center'
    },
    emptyCartHeading: {
        fontSize: 24,
        fontWeight: '600',
    },
});

export default CartList