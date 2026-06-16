import './index.css'
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/services/query.js";
import {ThemeContextProvider} from "@/providers/theme.jsx";

const root = createRoot(document.getElementById('root'))

root.render(
    <ThemeContextProvider>
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    </ThemeContextProvider>
)
