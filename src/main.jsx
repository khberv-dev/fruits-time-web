import 'bootstrap/dist/css/bootstrap.min.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/query.js";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import AlertProvider from "@/providers/alert/AlertProvider.jsx";

const root = createRoot(document.getElementById('root'))
const theme = createTheme({
    palette: {
        mode: 'dark',
    }
})

root.render(
    <QueryClientProvider client={ queryClient }>
        <ThemeProvider theme={ theme }>
            <CssBaseline/>
            <AlertProvider>
                <App/>
            </AlertProvider>
        </ThemeProvider>
    </QueryClientProvider>
)
