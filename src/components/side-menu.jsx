import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

// import component 👇
import Drawer from 'react-modern-drawer'

//import styles 👇
import 'react-modern-drawer/dist/index.css'
import axiosClient from '../../axios-client'
import { useStateContext } from '../context/ContextProvider'
import { getAttachmentURL } from '../functions/Common'
import { ROLES } from '../../constants'
import { StarRating } from '../functions/StarRating'

const SideMenu = () => {
    const { token, user, getProvinceName } = useStateContext();
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    const { setUser, setToken } = useStateContext()
    const navigate = useNavigate();

    const triggerLogout = ev => {
        ev.preventDefault()

        axiosClient.post('/api/logout')
            .then(() => {
                console.log('we re out')
                setUser(null)
                setToken(null)
                navigate('/login');
            })
    }

    const handleLinkClick = () => {
        toggleDrawer();
    }

    return (
        <>


            <button className='cursor-pointer text-[18px] ' onClick={toggleDrawer}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F8BBD0" className="size-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg></button>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                duration={150}
                size={350}
                //className='bg-[#B5B5B5B5]'
            >
                <div className='p-[30px]'>
                    

                    {!token ?
                        <>
                        
                            <div className='before-login flex flex-col text-center justify-center mt-[40px] gap-[15px]'>
                                <Link onClick={handleLinkClick} to="/how-to" className='bg-[#F8BBD0] text-[#424242] p-[10px]'>How to?</Link>
                                {/* <Link onClick={handleLinkClick} to="/hostess" className='bg-[#F8BBD0] text-[#424242] p-[10px]'>Are you a Hostess?</Link> */}
                                <Link onClick={handleLinkClick} to="/contact" className='bg-[#F8BBD0] text-[#424242] p-[10px]'>Help & Contact</Link>
                            </div>
                            <div className='login-signup flex flex-col flex-end text-center align-bottom  mt-[40px] gap-[15px]'>
                                <Link onClick={handleLinkClick} to="/login" className='bg-[#E91E63] text-white p-[10px] max-w-[190px] m-auto w-full'>Login</Link>
                                <Link onClick={handleLinkClick} to="/sign-up" className='bg-[#E91E63] text-white p-[10px] max-w-[190px] m-auto w-full'>Sign up</Link>
                            </div>
                        </> :
                        <>
                        <div className=''>
                            <div className='user-av flex items-center gap-x-[15px]'>
                                <div className='av bg-[#F5F5F5] h-[103px] w-[103px] rounded-full'>
                                    {user?.profile_picture_id && <img className={`w-full h-full object-cover rounded-full`} src={getAttachmentURL(user.profile_picture_id)}></img>}
                                </div>
                                <div className='user-data'>
                                    <h4 className='text-[#424242] text-[24px] font-[700]'>{user?.name || 'User'}</h4>
                                    <p className='text-[#424242] text-[20px]'>{getProvinceName(user?.profile?.province_id) || 'City'} </p>
                                    <StarRating rating={user?.rating || 0} />
                                </div>

                            </div>
                        </div>
                            <div className='after-login  flex flex-col text-center justify-center mt-[40px] gap-[15px]'>
                                {user?.role === ROLES.KING &&
                                    <Link onClick={handleLinkClick} to="/shop" className='bg-[#F8BBD0] text-[#424242] p-[10px]'>Shop</Link>
                                }
                                <Link onClick={handleLinkClick} to="/profile?tab=Personal Data" className='bg-[#F8BBD0] text-[#424242] p-[10px]'>Account</Link>
                                {user?.role === ROLES.KING &&
                                    <Link onClick={handleLinkClick} to="/purchase-history" className='bg-[#F8BBD0] text-[#424242] p-[10px]'>Purchase History</Link>
                                }
                                <Link onClick={handleLinkClick} to="/profile?tab=Profile" className='bg-[#F8BBD0] text-[#424242] p-[10px]'>Profile</Link>
                                <Link onClick={handleLinkClick} to='/profile?tab=Photo' className='bg-[#F8BBD0] text-[#424242] p-[10px]'>Photos</Link>
                                <Link onClick={handleLinkClick} to="/reviews" className='bg-[#F8BBD0] text-[#424242] p-[10px]'>Reviews</Link>
                                <Link onClick={handleLinkClick} to="/contact" className='bg-[#F8BBD0] text-[#424242] p-[10px]'>Help & Contact</Link>
                            </div>
                            <div className='logout-box flex gap-[15px] text-center mt-[20px]'>
                                <Link onClick={handleLinkClick} to="/last-views" className='text-center bg-[#E91E63] text-white p-[10px] max-w-[190px] m-auto w-full'><svg className='m-auto' width="23" height="23" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 24C2 24 10 8 24 8C38 8 46 24 46 24C46 24 38 40 24 40C10 40 2 24 2 24Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                </Link>
                                <a onClick={triggerLogout} className='cursor-pointer bg-[#E91E63] text-white p-[10px] max-w-[190px] m-auto w-full'>LOG OUT</a>
                            </div>
                        </>}


                </div>
            </Drawer>
        </>
    )
}

export default SideMenu
