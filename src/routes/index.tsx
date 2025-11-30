import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import SignInButton from '../components/SignInButton'

//provided by tanstack, outputs function to create the page
export const Route = createFileRoute('/')({
    component: LandingPage,
})

//the below should be easy to understand, its just the layout for this page, mostly using css styles
function LandingPage() {
    return (
        <div className='landingPage'>
            <div className='header'>
                <p className='text'>
                    Flashcardy
                </p>
            </div>
            <div className='landingPageBoxVert'>
                <div className='landingPageBoxHoriz'>
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
                </div>{''}
                <SignInButton/>
            </div>
        </div>
    )
}