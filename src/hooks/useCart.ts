import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function useCart() {
  const [cart, setCart] = useState([]);

  // Carrega o carrinho
  async function loadCart() {
    try {
      const saved = await AsyncStorage.getItem("cart");

      if (!saved) {
        setCart([]);
        return;
      }

      const parsed = JSON.parse(saved);

      const updatedCart = [];

      for (const item of parsed) {
        try {
          const res = await axios.get(
            `https://dummyjson.com/products/${item.id}`
          );

          updatedCart.push({
            id: item.id,
            quantity: item.quantity,
            title: res.data.title,
            price: res.data.price,
            thumbnail: res.data.thumbnail,
          });
        } catch (error) {
          // Se estiver offline, mantém os dados salvos
          updatedCart.push(item);
        }
      }

      setCart(updatedCart);
    } catch (error) {
      console.log("Erro ao carregar carrinho:", error);
      setCart([]);
    }
  }

  // Carrega o carrinho quando o hook é iniciado
  useEffect(() => {
    loadCart();
  }, []);

  // Salva carrinho
  async function saveCart(newCart) {
    try {
      const minimal = newCart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));

      await AsyncStorage.setItem(
        "cart",
        JSON.stringify(minimal)
      );

      setCart(newCart);
    } catch (error) {
      console.log("Erro ao salvar carrinho:", error);
    }
  }

  // Adicionar produto
  async function addToCart(product) {
    const exists = cart.find(
      (item) => item.id === product.id
    );

    if (exists) {
      increaseQuantity(product.id);
      return;
    }

    try {
      const res = await axios.get(
        `https://dummyjson.com/products/${product.id}`
      );

      const newItem = {
        id: product.id,
        quantity: 1,
        title: res.data.title,
        price: res.data.price,
        thumbnail: res.data.thumbnail,
      };

      await saveCart([...cart, newItem]);

    } catch (error) {
      console.log("Erro ao adicionar ao carrinho:", error);
    }
  }

  // Remover produto
  function removeFromCart(id) {
    const newCart = cart.filter(
      (item) => item.id !== id
    );

    saveCart(newCart);
  }

  // Aumentar quantidade
  function increaseQuantity(id) {
    const newCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    saveCart(newCart);
  }

  // Diminuir quantidade
  function decreaseQuantity(id) {
    const newCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(
                1,
                item.quantity - 1
              ),
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(newCart);
  }

  // Limpar carrinho
  function clearCart() {
    saveCart([]);
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    loadCart,
  };
}
