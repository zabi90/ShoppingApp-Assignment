import React from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import { Product } from '../data/productSlice';

type ItemProps = { product: Product };

const ProductItem = ({ product }: ItemProps) => {
    return (
<View style={styles.container}>
      <Image source={{ uri: product.img }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={()=>{}} style={[styles.button, styles.addButton]}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{}} style={[styles.button, styles.deleteButton]}>
          <Text style={styles.buttonText}>Delete from Cart</Text>
        </TouchableOpacity>
      </View>
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
    button: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
    },
    addButton: {
        backgroundColor: '#4caf50',
    },
    deleteButton: {
        backgroundColor: '#f44336',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default ProductItem