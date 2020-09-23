import React, { useEffect, useState, useCallback } from 'react'
import { TouchableOpacity, View, Text, ScrollView, RefreshControl } from 'react-native';
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import foodList from './assets/produk/food'
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart } from './redux/cartActions';
import { Col, Row, Grid } from "react-native-easy-grid";

export default function ListProduct() {

    const dispatch = useDispatch()
    const globalState = useSelector(state => state);
    const [listProduct, setListProduct] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [cartState, setCartState] = useState([])

    const [cart] = useState([])

    useEffect(() => {
        setListProduct(foodList)
    }, []);

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const checkOutPage = () => {
        console.log(cart)
    }

    const onRefresh = useCallback(
        () => {
            setRefreshing(true);
            dispatch(emptyCart())
            console.log('halaman di refresh')
            setCartState(globalState.cart)
            wait(2000).then(() => setRefreshing(false));
        },
        [],
    )

    return (
        <>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View style={{ backgroundColor: 'white', flex: 1 }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{paddingVertical: 10, paddingHorizontal: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 28}}>Total</Text>
                        </View>
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 28 }}>0.00</Text>
                        </View>
                    </View>
                    <Grid>
                        <Col style={{ backgroundColor: '#337474', paddingVertical: 10 }}>
                            <Text style={{textAlign: 'center', color: 'white'}}>Name</Text>
                        </Col>
                        <Col style={{ backgroundColor: '#337474', paddingVertical: 10 }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Quantity</Text>
                        </Col>
                        <Col style={{ backgroundColor: '#337474', paddingVertical: 10 }}>
                            <Text style={{ textAlign: 'center', color: 'white' }}>Unit Price</Text>
                        </Col>                        
                    </Grid>                        
                </View>
            </ScrollView>
        </>
    )

}

