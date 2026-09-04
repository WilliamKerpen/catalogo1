import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  increaseQuantity as increaseQuantityAction,
  decreaseQuantity as decreaseQuantityAction,
  clearCart as clearCartAction,
  setCart,
} from "../redux/slices/cartSlice";

import { useAppDispatch, useAppSelector } from "../redux/hooks";

export default function useCart() {
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cart.items);

  // Carrega o carrinho salvo no AsyncStorage
  useEffect(() => {
    async function loadSavedCart() {
      try {
        const saved = await AsyncStorage.getItem("cart");

        if (saved) {
          const parsed = JSON.parse(saved);

          dispatch(setCart(parsed));
        }
      } catch (error) {
        console.log("Erro ao carregar carrinho:", error);
      }
    }

    loadSavedCart();
  }, [dispatch]);

  // Salva o carrinho no AsyncStorage sempre que ele mudar
  useEffect(() => {
    async function saveCart() {
      try {
        await AsyncStorage.setItem(
          "cart",
          JSON.stringify(cart)
        );
      } catch (error) {
        console.log("Erro ao salvar carrinho:", error);
      }
    }

    saveCart();
  }, [cart]);

  function addProductToCart(product: any) {
    dispatch(
      addToCartAction({
        id: product.id,
        quantity: 1,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      })
    );
  }

  function removeFromCart(id: number) {
    dispatch(removeFromCartAction(id));
  }

  function increaseQuantity(id: number) {
    dispatch(increaseQuantityAction(id));
  }

  function decreaseQuantity(id: number) {
    dispatch(decreaseQuantityAction(id));
  }

  function clearCart() {
    dispatch(clearCartAction());
  }

  return {
    cart,
    addToCart: addProductToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };
}

