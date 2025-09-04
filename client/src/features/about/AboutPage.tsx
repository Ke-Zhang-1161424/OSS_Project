import { Container, Typography, ButtonGroup, Button, Alert, AlertTitle, List, ListItem, ListItemText } from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]); // 这个状态用来存储验证错误信息

    // 这个函数用来触发获取验证错误的API调用
    function getValidationError() {
        agent.TestErrors.getValidationError()
            .then(() => console.log('should not see this'))
            .catch(error => setValidationErrors(error));
    }

    // 这个组件渲染了一个按钮组，每个按钮用来测试不同类型的错误
    return (
        <Container>
            <Typography gutterBottom variant='h2'>
                Errors for Testing
            </Typography>
            <ButtonGroup fullWidth>
                <Button variant='contained' onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get401Error().catch(error => console.log(error))}>Test 401 Error</Button>
                <Button variant='contained' onClick={ () => agent.TestErrors.get404Error().catch(error => console.log(error))}>Test 404 Error</Button>
                <Button variant='contained' onClick={() => agent.TestErrors.get500Error().catch(error => console.log(error))}>Test 500 Error</Button>
                <Button variant='contained' onClick={getValidationError}>Test Validation Error</Button>
            </ButtonGroup>
            {validationErrors.length > 0 &&
                <Alert severity='error'>
                    <AlertTitle>
                        Validation Errors
                    </AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={ error}>
                                <ListItemText>{ error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>    
            }
        </Container>
    );
}
