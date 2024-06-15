import { useNavigation, useRoute } from '@react-navigation/native';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput, PaperProvider } from 'react-native-paper';
import { db } from '../service/connectionFirebase';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [key, setKey] = useState('');
    const navigation = useNavigation();
    const route = useRoute();

    const Separator = () => {
        return <View style={styles.separator} />;
    }

    useEffect(() => {
        if (route.params?.product) {
            const { product } = route.params;
            setKey(product.key);
            setName(product.name);
            setBrand(product.brand);
            setType(product.type);
            setPrice(product.price);
        }
    }, [route.params?.product]);

    async function insertUpdate() {
        if (name === '') { alert('O sabor deve ser informado!'); return; }
        if (brand === '') { alert('Os ingredientes devem ser informados!'); return; }
        if (price === '') { alert('O preço deve ser informado!'); return; }
        if (type === '') { alert('O tamanho deve ser informado!'); return; }
        if (name.length < 4) { alert('O sabor deve conter mais de 3 caracteres!'); return; }
        if (brand.length < 4) { alert('Os ingredientes deve conter mais de 3 caracteres!'); return; }
        if (price.length < 4) { alert('O preço deve conter mais de 3 caracteres!'); return; }
        if (type.length < 4) { alert('O tamanho deve conter mais de 3 caracteres!'); return; }
        try {
            if (key) {
                const productRef = doc(db, 'products', key);
                await updateDoc(productRef, {
                    name,
                    brand,
                    type,
                    price,
                });
            } else {
                await addDoc(collection(db, 'products'), {
                    name,
                    brand,
                    type,
                    price,
                });
            }
            clearData();
            Keyboard.dismiss();
            setKey('');
            navigation.navigate('Pizzas');
        } catch (error) {
            console.error("Error adding/updating document: ", error);
        }
    }

    function clearData() {
        setName('');
        setBrand('');
        setType('');
        setPrice('');
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                <TextInput
                    label="Sabor"
                    mode="outlined"
                    left={<TextInput.Icon icon="pizza" color="#FF6E1F" />}
                    maxLength={40}
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    theme={{ colors: { text: '#000', primary: '#FAF3E1', placeholder: '#222222', background: '#BD1C00', surface: '#BD1C00' }}}
                />
                <Separator />
                <TextInput
                    label="Ingredientes"
                    mode="outlined"
                    left={<TextInput.Icon icon="pan" color="#FF6E1F" />}
                    style={styles.input}
                    onChangeText={setBrand}
                    value={brand}
                    theme={{ colors: { text: '#fff', primary: '#FAF3E1', placeholder: '#222222', background: '#BD1C00', surface: '#BD1C00' }}}
                />
                <Separator />
                <TextInput
                    label="Tamanho"
                    mode="outlined"
                    left={<TextInput.Icon icon="fit-to-page-outline" color="#FF6E1F" />}
                    style={styles.input}
                    onChangeText={setType}
                    value={type}
                    theme={{ colors: { text: '#fff', primary: '#FAF3E1', placeholder: '#222222', background: '#BD1C00', surface: '#BD1C00' }}}
                />
                <Separator />
                <TextInput
                    label="Preço"
                    mode="outlined"
                    left={<TextInput.Icon icon="cash" color="#FF6E1F" />}
                    style={styles.input}
                    onChangeText={setPrice}
                    value={price}
                    theme={{ colors: { text: '#fff', primary: '#FAF3E1', placeholder: '#222222', background: '#BD1C00', surface: '#BD1C00' }}}
                />
                <Separator />
                <Button mode="contained" onPress={insertUpdate} style={styles.button}>
                    <Text style={styles.textButton}>Salvar</Text>
                </Button>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#222222',
    },
    input: {
        marginBottom: 15,
        borderRadius: 5,
        backgroundColor: '#252525',
    },
    separator: {
        height: 10,
    },
    button: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#FF6E1F',
    },
    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    }
});

export default ProductForm;
