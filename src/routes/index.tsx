import { createFileRoute } from '@tanstack/react-router'
import SignInButton from '../components/SignInButton'

export const Route = createFileRoute('/')({
    component: LandingPage,
})

function LandingPage() {
    return (
        <div className="p-2">
            <h3>This is the Home Page of Flashcardy</h3>
            <SignInButton/>
        </div>
    )
}