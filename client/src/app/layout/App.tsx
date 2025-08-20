import Catalog from '../../features/catalog/Catalog'; // 新增导入
import { Container, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import Header from './Hearder';
import { useState } from 'react'; // 导入 useState Hook



// 这是一个简单的 React 应用程序，使用 TypeScript 和 React Hooks
// useState 是 React 的一个 Hook，用于在函数组件中添加状态
function App() {
    const [darkMode, setDarkMode] = useState(false); // 定义一个状态变量 darkMode，初始值为 false
    const palettetype = darkMode ? 'dark' : 'light'; // 根据 darkMode 的值设置调色板类型
    const theme = createTheme({
        palette: {
            mode: palettetype, // 设置调色板模式为 light 或 dark
            background: {
                default: palettetype === 'light'?'#eaeaea':'#121212'
            }
        }
    });

    // 这是一个处理主题切换的函数，当用户切换主题时调用
    function handleThemeChange() {
        setDarkMode(!darkMode);
    }


    // 返回 JSX 结构，渲染应用程序的界面
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

// 这里导出 App 组件，以便在其他文件中使用
export default App;
