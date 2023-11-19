import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';



const WishList = () => {
    return (
        <View style={styles.container}>
          <Text>WishList List</Text>
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

export default  WishList