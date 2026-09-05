import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas
import Login from '../screens/login/Login';
import Home from '../screens/home/Home';
import FilteredProducts from '../screens/filtered/FilteredProducts';
import ProductDetails from '../screens/productsDetails/ProductDetails';
import Profile from '../screens/profile/Profile';
import Cart from '../screens/cart/Cart';
import Favorites from '../screens/favorites/Favorites';
import EditProfile from '../screens/profile/EditProfile';
import Register from '../screens/auth/Register';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#000",
          },

          headerTintColor: "#fff",

          headerTitleStyle: {
            color: "#fff",
            fontWeight: "bold",
            fontSize: 20,
          },

          headerShadowVisible: false,
        }}
      >

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: "Cadastro" }}
        />

        <Stack.Screen
          name="FilteredProducts"
          component={FilteredProducts}
          options={{ title: "Produtos" }}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ title: "Detalhes do Produto" }}
        />

        <Stack.Screen
          name="Favorites"
          component={Favorites}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
        />

        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}
