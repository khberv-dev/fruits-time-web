# Instructions: Build a React Admin Dashboard like fruitstime-web

A step-by-step guide for scaffolding a React 19 admin dashboard with the same architecture: Vite + React Router v7 + TanStack React Query v5 + Axios + Gravity UI.

---

## 1. Stack

- **Vite** + **React 19** (JSX, no TypeScript)
- **React Router v7** for routing
- **TanStack React Query v5** for server state
- **Axios** for HTTP
- **Gravity UI** (`@gravity-ui/uikit`, `@gravity-ui/icons`, `@gravity-ui/navigation`)
- **React Hook Form** for forms
- **Recharts** for charts, **dayjs** for dates
- **ESLint 9** flat config

---

## 2. Scaffold

```bash
npm create vite@latest my-app -- --template react
cd my-app

npm i @gravity-ui/uikit @gravity-ui/icons @gravity-ui/navigation \
      @tanstack/react-query axios dayjs react-hook-form react-router recharts

npm i -D @eslint/js eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals
```

---

## 3. Vite config — `vite.config.js`

Add the `@` alias for `src/`:

```js
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
})
```

---

## 4. Environment

`.env.example`:

```
VITE_BASE_API_URL=http://localhost:8000/api
VITE_BASE_CDN_URL=http://localhost:8000/public
```

Copy to `.env` and adjust per environment.

---

## 5. Folder layout

```
src/
├── main.jsx                  # Mounts ThemeProvider + QueryClientProvider
├── App.jsx                   # Router + providers + route table
├── index.css
├── services/
│   ├── api.js                # Axios instance + token interceptors
│   ├── config.js             # Env vars
│   ├── query.js              # queryClient + useInfoMutation wrapper
│   ├── toaster.js            # Singleton Toaster
│   └── <domain>/             # One folder per backend resource
│       ├── api.js            # Raw axios calls
│       └── query.js          # React Query hooks
├── providers/
│   ├── auth.jsx              # useAuth()
│   ├── header.jsx            # useHeader()
│   └── resource-locale.jsx   # useResourceLocale()
├── ui/
│   ├── layouts/<name>/       # AppLayout (sidebar + header + <Outlet/>)
│   ├── pages/<name>/         # One folder per route, with index.jsx
│   ├── components/<name>/    # Reusable cards, image-upload, confirm-dialog, ...
│   └── dialogs/
└── utils/lib.js              # Pure helpers
```

**Rule:** one folder per page/component with `index.jsx` inside. Lets a folder grow (styles, sub-components) without refactoring imports.

---

## 6. Common service code

### `src/services/config.js`

```js
export const baseApiUrl = import.meta.env.VITE_BASE_API_URL
export const baseCdnUrl = import.meta.env.VITE_BASE_CDN_URL
```

### `src/services/toaster.js`

```js
import {Toaster} from "@gravity-ui/uikit";

export const toaster = new Toaster()
```

### `src/services/api.js` — axios instance with auto-refresh

```js
import axios from "axios";
import {baseApiUrl} from "@/services/config.js";

const refreshTokensPath = 'auth/refresh'

export const api = axios.create({
    baseURL: baseApiUrl
})

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token')

        if (accessToken && config.url !== refreshTokensPath) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config

        if (error.response?.status !== 401 || config.url === refreshTokensPath) {
            return Promise.reject(error)
        }

        try {
            const refreshToken = localStorage.getItem('refresh_token')
            const {data} = await api.post(refreshTokensPath, {}, {
                headers: {Authorization: `Bearer ${refreshToken}`}
            })

            localStorage.setItem('access_token', data.accessToken)
            localStorage.setItem('refresh_token', data.refreshToken)

            config.headers['Authorization'] = `Bearer ${data.accessToken}`

            return api(config)
        } catch (err) {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            window.location.href = '/login'
        }
    }
)
```

### `src/services/query.js` — queryClient + mutation wrapper

```js
import {QueryClient, useMutation, useQueryClient} from "@tanstack/react-query";
import {toaster} from "@/services/toaster.js";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false
        }
    }
})

export const useInfoMutation = ({queryKey, mutationFn, onSuccess, onError}) => {
    const client = useQueryClient()

    return useMutation({
        mutationFn,
        onSuccess: async (data) => {
            await client.invalidateQueries({queryKey, exact: false})

            if (data?.message) {
                toaster.add({
                    name: `success-${Date.now()}`,
                    content: data.message,
                    theme: 'success',
                    timeout: 3000,
                })
            }

            if (onSuccess) {
                onSuccess(data)
            }
        },
        onError: (error) => {
            const message = error?.response?.data?.message ?? error?.message

            if (message) {
                toaster.add({
                    name: `error-${Date.now()}`,
                    content: Array.isArray(message) ? message.join(', ') : message,
                    theme: 'danger',
                    timeout: 5000,
                })
            }

            if (onError) {
                onError(error)
            }
        }
    })
}
```

Use `useInfoMutation` for **all mutations** — it gives uniform toast handling and cache invalidation by `queryKey` prefix.

---

## 7. Domain service example — `auth`

### `src/services/auth/api.js`

```js
import {api} from "@/services/api.js";

export async function signIn(data) {
    const res = await api.post('auth/sign-in', data)
    return res.data
}
```

### `src/services/auth/query.js`

```js
import {useInfoMutation} from "@/services/query.js";
import {signIn} from "@/services/auth/api.js";

export const useSignIn = () => useInfoMutation({
    queryKey: ['user'],
    mutationFn: (data) => signIn(data),
    onSuccess: (data) => {
        const {accessToken, refreshToken} = data

        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('refresh_token', refreshToken)
    }
})
```

### Domain service example — `product`

`src/services/product/api.js`:

```js
import {api} from "@/services/api.js";

export async function getAllProducts(catalogId, locale) {
    const res = await api.get(`catalog/${catalogId}/product/all`, {params: {locale}})
    return res.data
}

export async function createProduct(catalogId, data, locale) {
    const res = await api.post(`catalog/${catalogId}/product`, data, {params: {locale}})
    return res.data
}

export async function updateProduct(catalogId, productId, data, locale) {
    const res = await api.put(`catalog/${catalogId}/product/${productId}`, data, {params: {locale}})
    return res.data
}

export async function deleteProduct(catalogId, productId) {
    const res = await api.delete(`catalog/${catalogId}/product/${productId}`)
    return res.data
}
```

`src/services/product/query.js`:

```js
import {useQuery} from "@tanstack/react-query";
import {getAllProducts, createProduct, updateProduct, deleteProduct} from "@/services/product/api.js";
import {useInfoMutation} from "@/services/query.js";
import {useResourceLocale} from "@/providers/resource-locale.jsx";

export const useGetAllProducts = (catalogId) => {
    const {resourceLocale} = useResourceLocale()

    return useQuery({
        queryKey: ['product', 'all', catalogId, resourceLocale],
        queryFn: () => getAllProducts(catalogId, resourceLocale),
        enabled: !!catalogId,
    })
}

export const useCreateProduct = () => useInfoMutation({
    queryKey: ['product'],
    mutationFn: ({catalogId, data, locale}) => createProduct(catalogId, data, locale),
})

export const useUpdateProduct = () => useInfoMutation({
    queryKey: ['product'],
    mutationFn: ({catalogId, productId, data, locale}) => updateProduct(catalogId, productId, data, locale),
})

export const useDeleteProduct = () => useInfoMutation({
    queryKey: ['product'],
    mutationFn: ({catalogId, productId}) => deleteProduct(catalogId, productId),
})
```

**Pattern:** read `locale` from `useResourceLocale()` inside the hook so callers don't have to thread it. Use `queryKey` arrays like `['product', 'all', catalogId, locale]` so mutations can invalidate by prefix.

---

## 8. Providers

### `src/providers/auth.jsx`

```jsx
import {createContext, useContext} from "react";
import {useNavigate} from "react-router";
import {useQueryClient} from "@tanstack/react-query";
import {useGetMe} from "@/services/user/query.js";

const AuthContext = createContext(null)

export function AuthProvider({children}) {
    const {data: user, isLoading} = useGetMe()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const logout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        queryClient.removeQueries({queryKey: ['user']})
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{user, isLoading, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
```

### `src/providers/header.jsx`

```jsx
import {createContext, useContext, useState} from "react";

const HeaderContext = createContext(null)

export function HeaderProvider({children}) {
    const [title, setTitle] = useState('')
    const [onBack, setOnBack] = useState(null)

    const setHeader = ({title = '', onBack = null} = {}) => {
        setTitle(title)
        setOnBack(() => onBack)
    }

    return (
        <HeaderContext.Provider value={{title, onBack, setHeader}}>
            {children}
        </HeaderContext.Provider>
    )
}

export const useHeader = () => useContext(HeaderContext)
```

### `src/providers/resource-locale.jsx`

```jsx
import {createContext, useContext, useState} from "react";

const ResourceLocaleContext = createContext(null)

export function ResourceLocaleProvider({children}) {
    const [resourceLocale, setResourceLocale] = useState(
        () => localStorage.getItem('locale') || 'uz'
    )

    const changeResourceLocale = (value) => {
        localStorage.setItem('locale', value)
        setResourceLocale(value)
    }

    return (
        <ResourceLocaleContext.Provider value={{resourceLocale, changeResourceLocale}}>
            {children}
        </ResourceLocaleContext.Provider>
    )
}

export const useResourceLocale = () => useContext(ResourceLocaleContext)
```

---

## 9. App bootstrap

### `src/main.jsx`

```jsx
import './index.css'
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/services/query.js";
import {ThemeProvider} from "@gravity-ui/uikit";

const root = createRoot(document.getElementById('root'))

root.render(
    <ThemeProvider theme={'system'}>
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    </ThemeProvider>
)
```

### `src/App.jsx`

```jsx
import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {ToasterComponent, ToasterProvider} from "@gravity-ui/uikit";
import {toaster} from "@/services/toaster.js";
import {AuthProvider} from "@/providers/auth.jsx";
import {ResourceLocaleProvider} from "@/providers/resource-locale.jsx";
import {HeaderProvider} from "@/providers/header.jsx";
import AppLayout from "@/ui/layouts/app-layout/index.jsx";
import LoginPage from "@/ui/pages/login/index.jsx";
import MainPage from "@/ui/pages/main/index.jsx";

const RequireAuth = ({children}) => {
    if (!localStorage.getItem('access_token')) {
        return <Navigate to="/login" replace/>
    }
    return children
}

function App() {
    return (
        <ToasterProvider toaster={toaster}>
            <ToasterComponent/>
            <BrowserRouter>
                <ResourceLocaleProvider>
                    <AuthProvider>
                        <HeaderProvider>
                            <Routes>
                                <Route path="/login" element={<LoginPage/>}/>
                                <Route element={<RequireAuth><AppLayout/></RequireAuth>}>
                                    <Route path="/" element={<MainPage/>}/>
                                    {/* add protected routes here */}
                                </Route>
                            </Routes>
                        </HeaderProvider>
                    </AuthProvider>
                </ResourceLocaleProvider>
            </BrowserRouter>
        </ToasterProvider>
    )
}

export default App
```

Provider order matters: `ToasterProvider` → `BrowserRouter` → `ResourceLocaleProvider` → `AuthProvider` (needs Router for `useNavigate`) → `HeaderProvider` → `<Routes>`.

---

## 10. Utility helpers — `src/utils/lib.js`

```js
export function formatNumber(input) {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function extractDigits(input) {
    return String(input).replace(/\D/g, '')
}

export function formatPhoneNumber(input) {
    const digits = String(input).replace(/\D/g, '').slice(0, 12)

    const groups = [3, 2, 3, 2, 2]
    const parts = []
    let index = 0

    for (const size of groups) {
        if (index >= digits.length) break

        parts.push(digits.slice(index, index + size))
        index += size
    }

    return parts.join(' ')
}
```

---

## 11. UI conventions

- Pages call `useHeader().setHeader({title, onBack})` inside a `useEffect` on mount.
- Forms use **React Hook Form**; `onSubmit` calls a mutation hook from the service layer.
- Destructive actions go through a reusable `<ConfirmDialog>` before firing the mutation.
- Image uploads use a single `<ImageUpload>` component that posts the file and returns a CDN key.
- Active/inactive states use a small "resource badge" component for consistency.

---

## 12. ESLint — `eslint.config.js`

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import {defineConfig, globalIgnores} from 'eslint/config'

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{js,jsx}'],
        extends: [
            js.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: {jsx: true},
                sourceType: 'module',
            },
        },
        rules: {
            'no-unused-vars': ['off', {varsIgnorePattern: '^[A-Z_]'}],
        },
    },
])
```

---

## 13. Scripts — `package.json`

```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
}
```

---

## 14. Storage keys

| Key | Purpose |
|---|---|
| `access_token` | JWT access token |
| `refresh_token` | JWT refresh token |
| `locale` | UI/resource locale (default `uz`) |

---

## Mental model

The spine of the architecture is:

**axios instance with token refresh → React Query hooks per domain → page components that compose forms + mutations + a shared header/layout.**

Every new feature follows the same recipe:

1. Add `services/<domain>/api.js` (raw HTTP) and `services/<domain>/query.js` (hooks).
2. Add a page folder under `ui/pages/<name>/` with `index.jsx`.
3. Register the route in `App.jsx`.
4. Inside the page: `useHeader()` to set the title, React Hook Form for input, a mutation hook for submit, `<ConfirmDialog>` for destructive actions.
