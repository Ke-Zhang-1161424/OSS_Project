import { Card, CardMedia, CardContent, Typography, CardActions, Button} from "@mui/material";
import type { Product } from "../../app/models/product";

// ���ﶨ����һ�� Props �ӿڣ�����ָ���������������
interface Props {
    product: Product;
}

// ����һ���򵥵� React �������������һ�� product ���ԣ�����Ⱦ��Ʒ��Ϣ
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