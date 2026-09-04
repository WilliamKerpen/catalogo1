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
    // NavigationContainer deve envolver TODA a navegação
    <NavigationContainer>

      {/* Stack principal */}
      <Stack.Navigator initialRouteName="Login">

        {/* Tela de Login */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        {/* Tela pós-login */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        {/* Tela de Cadastro */}

        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: 'Cadastro' }}
        />   


        {/* Lista filtrada */}
        <Stack.Screen
          name="FilteredProducts"
          component={FilteredProducts}
          options={{ title: 'Produtos' }}
        />

        {/* Detalhes */}
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ title: 'Detalhes do Produto' }}
        />

        {/* Favoritos */}
        <Stack.Screen
          name="Favorites"
          component={Favorites}
        />

        {/* Carrinho */}
        <Stack.Screen
          name="Cart"
          component={Cart}
        />

        {/* Perfil */}
        <Stack.Screen
          name="Profile"
          component={Profile}
        />

        {/* Editar Perfil */}
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
