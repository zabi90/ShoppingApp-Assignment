import React, { useEffect } from 'react';
import {
    StyleSheet,
    FlatList,
    RefreshControl,
    View,
    Text
} from 'react-native';

import ProductItem from '../../components/ProductItem';
import { useAppDispatch, useAppSelector } from '../../data/Store';
import { Product, fetchProducts } from '../../data/productSlice'
import { addCartItem } from '../../data/cartSlice'

const ProductList = () => {

    const dispatch = useAppDispatch();
    const productState = useAppSelector(state => state.product)
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={productState.status == 'loading' ? true : false}
                        onRefresh={() => {
                            dispatch(fetchProducts());
                        }}
                    />
                }
                data={productState.products}
                renderItem={({ item }) => <ProductItem product={item} updateItemQuantity={(product : Product, quantity : number)=>{

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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default ProductList

