import { Card, CardMedia, CardContent, Typography, CardActions, Button ,CardHeader, Avatar} from "@mui/material";
import type { Product } from "../../app/models/product";
import { Link } from "react-router-dom";

// 这里定义了一个 Props 接口，用于指定组件的属性类型
interface Props {
    product: Product;
}

// 这是一个简单的 React 函数组件，接收一个 product 属性，并渲染产品信息
export default function ProductCard({ product }:Props) {
    return (
        // 使用 Material-UI 的 Card 组件来展示产品信息
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: 'secondary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name} //product.name是用来显示产品名称的
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