import finnplay_logo from '../../assets/img/finnplay_logo.svg'
import profile_icon from '../../assets/icons/profile_icon.svg'
import '../../assets/css/navigation.css'
import { Link, useLocation } from 'react-router-dom'

const Navigation: React.FC = () => {
    const { pathname } = useLocation()
    const isHidden = pathname === "/login"

    return <div className={`nav ${isHidden && "hide-nav"}`}>
        <img src={finnplay_logo} alt="finnplay" />
        <div style={{display:"flex",gap:"1rem"}}>
            <Link to="/userpanel" className='nav__rightActions'>
                <img src={profile_icon} alt="profile_icon" />
            </Link>
            <Link to="/login" className='nav__rightActions'>
                <p>Logout</p>
            </Link>
        </div>
    </div>
}

export default Navigation