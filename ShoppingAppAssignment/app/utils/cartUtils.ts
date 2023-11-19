import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../data/cartSlice';


class Cart {
  /**
   * Add item into cart
   */
  addItem = async (item: CartItem, quantity: number): Promise<boolean> => {
    console.log('Cart.addItems:', item);
    console.log('Cart.addItemsQuantity:', quantity);
    
    try {
      if (quantity === 0) {
        return await this.deleteItem(item.id);
      } else {
        let cartItem: CartItem = Object.assign(item, {quantity});
        await AsyncStorage.setItem(cartItem.id, JSON.stringify(cartItem));
        console.log('sucessfully update cart item');
        return true;
      }
    } catch (e) {
      // save error
      console.log('error while adding Item', e);
      return false;
    }
    
  };

  clearAllCartItems = async (): Promise<void> => {
 
    try {
      const keys = await AsyncStorage.getAllKeys();
      const filterKeys  = keys.filter(key => key !== "user" && key !== "addresses")
     
      for (let index = 0; index < filterKeys.length; index++) {
        const key = filterKeys[index];
        await AsyncStorage.removeItem(key)
      }
    } catch (e) {
      console.log('erro while deleting  cartItems', e);
    }

  };


  getAllCartItems = async (): Promise<CartItem[]> => {
 
    //let keys: string[] = [];
    //let filterKeys: string[] = [];
    let cartItems: CartItem[] = [];
    try {
      const keys = await AsyncStorage.getAllKeys();
     
      const filterKeys  = keys.filter(key => key !== "user" && key !== "addresses")
     
      for (let index = 0; index < filterKeys.length; index++) {
        const key = filterKeys[index];
        const item = await AsyncStorage.getItem(key)

        if(item != null){
            const cartItem = JSON.parse(item);
            cartItems.push(cartItem);
        }

      }
    } catch (e) {
      console.log('erro while reading  cartItems', e);
    }
    console.log("getAllCartItems:",cartItems)
    return cartItems;
  };

  async deleteItem(id: string): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(id);
      console.log('item delete from cart');
      return true;
    } catch (e) {
      console.log('error while delete item', e);
      return false;
    }
  }

  mapCartItems = async (items: CartItem[]): Promise<CartItem[]> => {
    let mapItems: CartItem[] = [];

    for (let index = 0; index < items.length; index++) {
      const item = items[index];

      try {
        const s = await AsyncStorage.getItem(item.id);
        if(s != null){
            const cartItem = JSON.parse(s);
            console.log('cartItem', cartItem);
            let quantity = 0;
            if (cartItem) {
              quantity = cartItem.quantity;
              console.log('cartItem:quantity', quantity);
            } else {
              quantity = 0;
            }
            const mapItem: CartItem = Object.assign(item, {quantity});
            mapItems.push(mapItem);
        }else
        {
            let quantity = 0;
            const mapItem: CartItem = Object.assign(item, {quantity});
            mapItems.push(mapItem);
        }

      } catch (e) {
        console.log('erro while reading Items', e);
      }
    }

    console.log('mapped Items:', mapItems);
    return mapItems;
  };
}

export const CartUtils = new Cart();