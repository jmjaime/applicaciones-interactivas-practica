import { createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { ThemeExample1 } from './contexts/ThemeExample1'
import { AuthExample2 } from './contexts/AuthExample2'
import { CartExample3 } from './contexts/CartExample3'
import { LocalStorageExample1 } from './hooks/LocalStorageExample1'
import { FetchExample2 } from './hooks/FetchExample2'
import { DebounceExample3 } from './hooks/DebounceExample3'
import { ToggleExample4 } from './hooks/ToggleExample4'
import { UsersPage } from './pages/router/UsersPage'
import { UserDetailPage } from './pages/router/UserDetailPage'
import { PostsPage } from './pages/router/PostsPage'
import { PostDetailPage } from './pages/router/PostDetailPage'
import { ProductsLayout } from './pages/router/ProductsLayout'
import { ProductsListPage } from './pages/router/ProductsListPage'
import { postsLoader, postDetailLoader } from './loaders/postLoaders'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                lazy: async () => {
                    const { HomePage } = await import('./pages/HomePage')
                    return { Component: HomePage }
                },
            },
            // Context API Examples
            {
                path: 'context/theme',
                element: <ThemeExample1 />,
            },
            {
                path: 'context/auth',
                element: <AuthExample2 />,
            },
            {
                path: 'context/cart',
                element: <CartExample3 />,
            },
            // Custom Hooks Examples
            {
                path: 'hooks/localstorage',
                element: <LocalStorageExample1 />,
            },
            {
                path: 'hooks/fetch',
                element: <FetchExample2 />,
            },
            {
                path: 'hooks/debounce',
                element: <DebounceExample3 />,
            },
            {
                path: 'hooks/toggle',
                element: <ToggleExample4 />,
            },
            // React Router Examples - Dynamic Routes
            {
                path: 'router/users',
                element: <UsersPage />,
            },
            {
                path: 'router/users/:id',
                element: <UserDetailPage />,
            },
            // React Router Examples - Nested Routes
            {
                path: 'router/products',
                element: <ProductsLayout />,
                children: [
                    {
                        index: true,
                        element: <ProductsListPage />,
                    },
                ],
            },
            // React Router Examples - Data Loaders
            {
                path: 'router/posts',
                element: <PostsPage />,
                loader: postsLoader,
            },
            {
                path: 'router/posts/:id',
                element: <PostDetailPage />,
                loader: postDetailLoader,
            },
            // 404
            {
                path: '*',
                lazy: async () => {
                    const { NotFoundPage } = await import('./pages/NotFoundPage')
                    return { Component: NotFoundPage }
                },
            },
        ],
    },
])

