import { useNavigation } from "@react-navigation/native";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Dialog,
  FAB,
  PaperProvider,
  Paragraph,
  Portal,
  Text,
  Snackbar,
  Image,
} from "react-native-paper";
import { db } from "../service/connectionFirebase";

const ProductCard = ({ item, onEdit, onDelete }) => (
  <Card style={styles.card}>
    <View style={styles.cardTitleContainer}>
      <Text style={styles.cardTitle}>{item.name}</Text>
    </View>
    <Card.Content>
      <Text style={styles.cardText}>
        <Text style={styles.cardTextBold}>Tamanho:</Text> {item.type}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.cardTextBold}>Ingredientes:</Text> {item.brand}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.cardTextBold}>Preço:</Text> {item.price}
      </Text>
    </Card.Content>
    <Card.Actions style={styles.buttonsCard}>
      {/* <View style={styles.buttons}> */}
      <Button
        textColor="#FF6E1F"
        style={styles.buttonEdit}
        onPress={() => onEdit(item)}
      >
        Editar
      </Button>
      <Button
        textColor="white"
        style={styles.buttonDelete}
        onPress={() => onDelete(item)}
      >
        Excluir
      </Button>
      {/* </View> */}
    </Card.Actions>
  </Card>
);

export default function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const prods = [];
      snapshot.forEach((documentSnapshot) => {
        prods.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      setProducts(prods.reverse());
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const showDialog = (product) => {
    setSelectedProduct(product);
    setVisible(true);
  };

  const hideDialog = () => {
    setSelectedProduct(null);
    setVisible(false);
  };

  const handleDelete = useCallback(async () => {
    if (selectedProduct) {
      try {
        const docRef = doc(db, "products", selectedProduct.key);
        await deleteDoc(docRef);
        setSnackbarMessage("Produto excluído com sucesso!!");
      } catch (error) {
        setSnackbarMessage("Erro ao excluir produto: " + error.message);
      } finally {
        hideDialog();
        setSnackbarVisible(true);
      }
    }
  }, [selectedProduct]);

  const handleEdit = (item) => {
    navigation.navigate("Cadastrar pizzas", { product: item });
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
      {/* <Image
          source={require("./assets/bannerPizza.png")}
          style={styles.image}
        /> */}
        <Text style={styles.listar}>Cardápio</Text>
        {loading ? (
          <ActivityIndicator color="#6200ee" size={45} />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                onEdit={handleEdit}
                onDelete={showDialog}
              />
            )}
          />
        )}
        {/* <FAB
                    style={styles.fab}
                    icon="plus"
                    color="white"
                    onPress={() => navigation.navigate('Cadastrar Pizza')}
                /> */}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Excluir produto</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Tem certeza que deseja excluir o produto {selectedProduct?.name}
                ?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancelar</Button>
              <Button onPress={handleDelete}>Excluir</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3E1",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  listar: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#FF6E1F",
  },
  card: {
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: "#00020",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    backgroundColor: "#F5E6C540",
  },
  cardTitleContainer: {
    backgroundColor: "#FF6E1F",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center",
  },
  cardText: {
    color: "#222222",
    fontWeight: "400",
    fontSize: 15,
  },
  cardTextBold: {
    color: "#222222",
    fontWeight: "600",
  },
  buttonEdit: {
    borderRadius: 5,
    borderColor: "#FF6E1F",
    // borderWidth: 1,
    color: "#FF6E1F",
    marginHorizontal: 10,
    width: "40%",
  },
  buttonDelete: {
    borderRadius: 5,
    backgroundColor: "#FF6E1F",
    color: "#fff",
    marginHorizontal: 10,
    width: "40%",
  },
  buttonsCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    marginTop: 20,
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    display: "none",
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#BD1C00",
  },
});
