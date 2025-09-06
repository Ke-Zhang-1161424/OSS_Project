import { Backdrop, Box, CircularProgress,Typography } from "@mui/material";

// ���Props����������������������͵Ľӿ�
interface Props {
    message?: string;
}
// ���沿����һ�������������ʾһ�����ض����Ϳ�ѡ����Ϣ
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