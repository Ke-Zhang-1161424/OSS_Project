import { Card, CardMedia, CardContent, Typography, CardActions, Button ,CardHeader, Avatar} from "@mui/material";
import type { Product } from "../../app/models/product";
import { Link } from "react-router-dom";

// ���ﶨ����һ�� Props �ӿڣ�����ָ���������������
interface Props {
    product: Product;
}

// ����һ���򵥵� React �������������һ�� product ���ԣ�����Ⱦ��Ʒ��Ϣ
export default function ProductCard({ product }:Props) {
    return (
        // ʹ�� Material-UI �� Card �����չʾ��Ʒ��Ϣ
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: 'secondary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name} //product.name��������ʾ��Ʒ���Ƶ�
                slotProps={{
                    title: { sx: { fontWeight: 'bold', color:'primary.main' }},
                }}
            />

            <CardMedia
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: '#e1f5fe' }}
                image={product.imageUrl}
                title={ product.name}
            />


            <CardContent>
                <Typography gutterBottom color='secondary' variant="h5">
                    ${ (product.price / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {product.brand} / { product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to cart</Button>
                <Button component={Link} to={ `/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}