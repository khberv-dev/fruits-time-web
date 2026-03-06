import '@radix-ui/themes/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Theme } from "@radix-ui/themes"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/services/query.js"
import AlertProvider from "@/providers/alert/index.jsx"

const root = createRoot(document.getElementById('root'))

root.render(
    <Theme>
        <QueryClientProvider client={ queryClient }>
            <AlertProvider>
                <App/>
            </AlertProvider>
        </QueryClientProvider>
    </Theme>
)
