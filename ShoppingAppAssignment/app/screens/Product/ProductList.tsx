import React, { useEffect } from 'react';
import {
    StyleSheet,
    FlatList,
    RefreshControl,
    View,
} from 'react-native';

import ProductItem from '../../components/productItem';
import { useAppDispatch, useAppSelector } from '../../data/Store';
import { fetchProducts } from '../../data/productSlice'


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
                renderItem={({ item }) => <ProductItem product={item} />}
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

