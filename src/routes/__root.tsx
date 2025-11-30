import { createRootRoute, Outlet } from '@tanstack/react-router'

//DO NOT TOUCH
//JUST DONT TOUCH
//ITS NOT WORTH IT
//NOTHING NEEDED TO DO HERE
//just dont touch, this deals with calling the functions outputted from the page Files, and rendering them, but its like a third intermediary step
const RootLayout = () => (
        <div>
            <Outlet />
        </div>
)

export const Route = createRootRoute({ component: RootLayout })