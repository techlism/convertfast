'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from './ui/button';
import DarkModeSwitch from './DarkModeSwitch';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href={'/'}>
                                <img className="h-11 w-11 dark:invert" src="/convertfast.svg" alt="Logo" />
                            </Link>                            
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {/* <Button  className="font-medium" variant={'link'}>Home</Button> */}
                                <Button  className="font-medium" variant={'link'}>About</Button>
                                <Button  className="font-medium" variant={'link'}>Features</Button> {/*This will be an accordion*/}
                                <Button  className="font-medium" variant={'link'} onClick={()=>window.open('/report')}>Report an issue</Button>
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
                        <Link href="#" className="  px-3 py-2 rounded-lg text-sm font-medium block">Home</Link>
                        <Link href="#" className="  px-3 py-2 rounded-lg text-sm font-medium block">About</Link>
                        <Link href="#" className="  px-3 py-2 rounded-lg text-sm font-medium block">Services</Link>
                        <Link href="#" className="  px-3 py-2 rounded-lg text-sm font-medium block">Contact</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;