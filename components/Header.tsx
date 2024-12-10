import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import FileUplloader from './FileUplloader'
import Search from './Search'

const Header = () => {
    return (
        <header className="header">
            <Search />
            <div className='header-wrapper'>
                <FileUplloader />

                <form>
                    <Button type='submit' className="sign-out-button" >
                        <Image src="/assets/icons/logout.svg"
                            alt="logo"
                            width={24}
                            height={24}
                            className="2-6"
                        />

                    </Button>
                </form>
            </div>
        </header>
    )
}

export default Header