import { Card, CardMedia, CardContent, Typography, CardActions, Button} from "@mui/material";
import type { Product } from "../../app/models/product";

// 这里定义了一个 Props 接口，用于指定组件的属性类型
interface Props {
    product: Product;
}

// 这是一个简单的 React 函数组件，接收一个 product 属性，并渲染产品信息
export default function ProductCard({ product }:Props) {
    return (
        <Card>
            <CardMedia
                sx={{ height: 140 }}
                image="https://picsum.photos/seed/picsum/200/300"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}