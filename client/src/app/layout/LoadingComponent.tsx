import { Backdrop, Box, CircularProgress,Typography } from "@mui/material";

// 这个Props是用来定义组件的属性类型的接口
interface Props {
    message?: string;
}
// 下面部分是一个加载组件，显示一个加载动画和可选的消息
export default function LoadingComponent({ message = 'Loading...' }: Props) {
    return (
        <Backdrop open={true} invisible={true}>
            <Box display='flex' justifyContent='center' alignItems='center' height='100vh'>
                <CircularProgress size={100} color='primary' />
                <Typography variant='h4' sx={{ justifyContent: 'center', position: 'fixed', top: '60%' }}>{ message}</Typography>
            </Box>
        </Backdrop>
    )
}