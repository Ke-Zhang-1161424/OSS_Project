import Catalog from '../../features/catalog/Catalog'; // ��������
import { Container, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import Header from './Hearder';
import { useState } from 'react'; // ���� useState Hook



// ����һ���򵥵� React Ӧ�ó���ʹ�� TypeScript �� React Hooks
// useState �� React ��һ�� Hook�������ں�����������״̬
function App() {
    const [darkMode, setDarkMode] = useState(false); // ����һ��״̬���� darkMode����ʼֵΪ false
    const palettetype = darkMode ? 'dark' : 'light'; // ���� darkMode ��ֵ���õ�ɫ������
    const theme = createTheme({
        palette: {
            mode: palettetype, // ���õ�ɫ��ģʽΪ light �� dark
            background: {
                default: palettetype === 'light'?'#eaeaea':'#121212'
            }
        }
    });

    // ����һ�����������л��ĺ��������û��л�����ʱ����
    function handleThemeChange() {
        setDarkMode(!darkMode);
    }


    // ���� JSX �ṹ����ȾӦ�ó���Ľ���
  return (
      <ThemeProvider theme={ theme}>
          <CssBaseline />
          <Header darkMode={darkMode} handleThemeChange={ handleThemeChange} />
          <Container>
              <Catalog />
          </Container>

    </ThemeProvider>
  )
}

// ���ﵼ�� App ������Ա��������ļ���ʹ��
export default App;
