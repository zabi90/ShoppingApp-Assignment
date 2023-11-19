import React, {useState} from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type ItemProps = { 
    cartQuantity: number,
    addItem : (quantity: number) => void,
    removeItem : (quantity: number) => void
};

const CounterView = ({ cartQuantity, addItem, removeItem }: ItemProps) => {

    const [quantity, setQuantity] = useState(cartQuantity);
    return (
        <View>
        <View style={CounterViewStyle.counterContainer}>
          <TouchableOpacity
            style={CounterViewStyle.counterButton}
            onPress={() => {
              if ( quantity <= 0) {
                return;
              }
              const counter = quantity - 1;
              setQuantity(counter)
              removeItem(counter)
            }}>
            <Text style={CounterViewStyle.counterText}> - </Text>
          </TouchableOpacity>

          <Text style={CounterViewStyle.textButton}>{quantity}</Text>
          <TouchableOpacity
            style={CounterViewStyle.counterButton}
            onPress={() => {
              const counter = quantity + 1;
              setQuantity(counter)
              addItem(counter)
            }}>
            <Text style={CounterViewStyle.counterText}> + </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

const CounterViewStyle = StyleSheet.create({
    counterContainer: {
        height: 24,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
      },
      counterButton: {
        backgroundColor: 'green',
        height: 30,
        width: 30,
        margin: 8,
        borderRadius: 8,
        alignItems: 'center',
      },
      counterText: {
        marginTop: '15%',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      addButton: {
        width : 100,
        marginTop: 16,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: 'green',
        paddingStart: 18,
        paddingEnd: 18,
        paddingTop: 8,
        paddingBottom: 8,
        alignItems:'center',
        alignSelf: 'center',
      },
      textButton: {
        color: 'black',
        fontSize: 10,
        fontWeight: 'bold',
      },
      text: {
        fontSize: 18,
        width: '80%',
        height: 45,
        marginStart: 8,
        marginEnd: 8,
        color: 'black',
      },
});

export default CounterView