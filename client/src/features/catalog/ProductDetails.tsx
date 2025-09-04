import { Grid, Table, TableContainer, Typography, TableBody, TableRow, TableCell } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Divider from "@mui/material/Divider";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import NotFound from "../../app/errors/NotFound"


// 这个组件负责显示产品的详细信息

export default function ProductDetailsPage() {

    // 从URL参数中获取产品ID
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    // 使用useEffect在组件挂载时获取产品详情
    useEffect(() => {
        id && agent.Catalog.details(parseInt(id))
            .then(response => setProduct(response))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [id])

    if (loading) return <h3>Loading...</h3>

    if (!product) return <NotFound/>

    return (
        <Grid container spacing={ 6}>
            <Grid item xs={12} md={ 6}>
                <img src={product.imageUrl} alt={product.name} style={{width:'100%'}} />
            </Grid>
            <Grid item xs={12} md={ 6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{ product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}
