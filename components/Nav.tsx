
"use client"
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, MouseEventHandler } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
    const isUserLoggedIn = true;
    const handleSignOutClick = () => {
        signOut();
    }
    const [providers, setProviders] = useState<any>(null);
    const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);
    useEffect(() => {
        const getProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        getProviders();
    }, [])

    return (
        <nav className='flex-between w-full mb-16 pt-3'>
            <Link href="/" className='"flex gap2 flex-center'>
                <Image src="assets/images/logo.svg" width={30} height={30} className='object-contain' alt="logo" />
                <p className='logo_text'>Promtopia</p>
            </Link>
            { /** Mobile Navigation */}
            <div className='sm:flex hidden'>
                {isUserLoggedIn ?
                    (<div className='flex gap-3 md:gap-5'>
                        <Link href="/create-prompt" className='black_btn'>
                            Create Post
                        </Link>
                        <button type="button" onClick={handleSignOutClick} className='outline_btn'>Sign out</button>
                        <Link href="/profile">
                            <Image src="/assets/images/logo.svg" width={37} height={37} className="rounded-full" alt="profile"></Image>
                        </Link>
                    </div>)
                    : (<>
                        {providers && Object.values(providers).map((provider: any) =>
                        (
                            <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                                Sign In
                            </button>
                        ))}
                    </>)}
            </div>

            <div className='sm:hidden flex relative'>
                {isUserLoggedIn ? (
                    <div className='flex'>
                        <Image src="/assets/images/logo.svg" width={37} height={37}
                         className="rounded-full" alt="profile"
                         onClick={()=>{setToggleDropDown((prv)=>!prv)}}></Image>
                         {toggleDropDown && (
                            <div className='dropdown'>
                                <Link href="/profile" className='dropdown_link' onClick={()=>setToggleDropDown(false)}> 
                                    MyProfile
                                </Link>
                            </div>
                         )}
                    </div>
                ) : (<>
                    {providers && Object.values(providers).map((provider: any) =>
                    (
                        <button type="button" key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                            Sign In
                        </button>
                    ))}
                </>)}
            </div>

        </nav>
    )
}

export default Nav