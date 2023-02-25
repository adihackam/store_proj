import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { getProductsAsync, selectProducts, deleteProductsAsync } from '../features/product/productsSilce';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import Product from './Product';
import {selectAccess} from '../features/login/loginSlice';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ProductList() {
    const products = useAppSelector(selectProducts);
      const access = useAppSelector(selectAccess);
    const dispatch = useAppDispatch();
    useEffect(() => { dispatch(getProductsAsync(access)) }, [])
    console.log("ACCESS" + access)
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {products.map((prod, i) => {
                    return (
                        <Grid item xs={6}>
                            <Product id={prod.id} category={prod.category} currency={prod.currency} title={prod.title} description={prod.description} image={prod.image} price={prod.price}>

                            </Product>
                        </Grid>
                    );
                }
                )
                }
            </Grid>
        </Box>
    );
}