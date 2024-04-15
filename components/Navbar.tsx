'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './ui/button';
import DarkModeSwitch from './DarkModeSwitch';
import Image from 'next/image';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center xl:justify-start 2xl:justify-start lg:justify-start md:justify-start justify-between h-16 space-x-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href={'/'}>
                                <Image className="dark:invert" src="/convertfast.svg" alt="Logo" height={35} width={35}/>
                            </Link>                            
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {/* <Button  className="font-medium" variant={'link'}>Home</Button> */}
                                <Link  className='font-medium hover:underline text-md' href={'#'}>About</Link>
                                <Link  className='font-medium hover:underline text-md' href={'#'}>Features</Link> {/*This will be an accordion*/}
                                <Link  className='font-medium hover:underline text-md' href={'/report'}>Report an issue</Link>
                            </div>
                        </div>
                    </div>
                    <DarkModeSwitch/>                        
                    <div className="flex items-center">
                        <div className="-mr-2 flex md:hidden">
                            <Button onClick={toggleNavbar} type="button" className="inline-flex items-center justify-center p-2" variant={'outline'}>
                                <span className="sr-only">Open main menu</span> {/*For accessibility*/}
                                {!isOpen ? (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </Button>
                        </div>                                                                    
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden transition-slow">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="#" className="  px-3 py-2 rounded-lg text-sm font-medium block">About</Link>
                        <Link href="#" className="  px-3 py-2 rounded-lg text-sm font-medium block">Features</Link>
                        <Link href="#" className="  px-3 py-2 rounded-lg text-sm font-medium block">Report</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;