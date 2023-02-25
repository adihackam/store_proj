import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {getProductsAsync, deleteProductsAsync} from '../features/product/productsSilce';
import {selectAccess} from '../features/login/loginSlice';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function Product(props: any) {
    const dispatch = useAppDispatch();
    const access = useAppSelector(selectAccess);
    console.log(props)
    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="complex" src={props.image} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                {props.category ? props.category.name : 'NONE'}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {props.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {props.description}
                            </Typography>
                        </Grid>
                        <Grid item>
                        <IconButton 
                                    onClick={() => {
                                        dispatch(deleteProductsAsync({ access,id: props.id }))
                                        // dispatch(getImagesAsync(access))
                                    }}
                                    sx={{ color: 'red' }}
                                    aria-label={`delete ${props.id}`}


                                >
                            <DeleteForever />           
                        </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="div">
                            {props.price},{props.currency ? props.currency.symbol : 'NONE'}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}
