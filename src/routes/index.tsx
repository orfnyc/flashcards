import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import SignInButton from '../components/SignInButton'

export const Route = createFileRoute('/')({
    component: LandingPage,
})

function LandingPage() {
    return (
        <div className='landingPage'>
            <div className='header'>
                <p className='text'>
                    Flashcardy
                </p>
            </div>
            <div className='createMidAlignmentBox'>
                <div className='studycreateLink'>
                    <Link to="/Create" 
                    className="text">
                        Create
                    </Link>
                </div>
                <div className='studycreateLink'>
                    <Link to="/Study"
                    className="text">
                        Study
                    </Link>
                </div>
            </div>
            <SignInButton/>
        </div>
    )
}