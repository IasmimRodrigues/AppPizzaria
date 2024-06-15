import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import ProductForm from "./components/productform";
import ProductsManager from "./components/productsmanager";
import NotificationScreen from "./components/NotificationScreen";

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={require("./assets/bannerPizza.png")}
          style={styles.image}
        />

        <View style={styles.lanches}>
          {/* <Text style={styles.title}>
            Sanduíches e <br /> Acompanhamentos
          </Text> */}
          <Text style={styles.subtitle1}>
            Saboreie a autenticidade em cada fatia! Descubra o sabor
            irresistível da nossa pizzaria diretamente no seu navegador. Peça já
            a sua preferida!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Cardápio")}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function ProductsScreen() {
  return <ProductsManager />;
}

function ProductFormScreen() {
  return <ProductForm />;
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Cardápio" component={ProductsScreen} />
        <Drawer.Screen name="Cadastrar pizzas" component={ProductFormScreen} />
        {/* <Drawer.Screen name="Notificação" component={NotificationScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6E1F",
  },
  scrollViewContent: {
    alignItems: "center",
  },
  image: {
    width: "100%",
    // height: 200,
    resizeMode: "cover",
  },
  lanches: {
    backgroundColor: "#FF6E1F",
    width: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#ffffff", // Button background color
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "50%",
  },
  buttonText: {
    color: "#f42e09", // Button text color
    fontSize: 18,
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    color: "#fff",
    padding: 30,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle1: {
    fontSize: 15,
    color: "#fff",
    marginBottom: 30,
    marginTop: 30,
    marginHorizontal: 25,
    fontWeight: "400",
    textAlign: "center",
  },
});
