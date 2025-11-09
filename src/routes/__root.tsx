import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
        <div>
            <Outlet />
        </div>
)

export const Route = createRootRoute({ component: RootLayout })