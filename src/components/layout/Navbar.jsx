import React from 'react';
import { CardNav } from '../bits/CardNav';

export function Navbar() {
  const cardNavItems = [
    {
      index: '01 // WORK',
      tag: 'PROJECTS',
      label: 'PROJECT ARCHIVE',
      bgColor: '#141414',
      textColor: '#F5F5F0',
      links: [
        { label: 'All Projects Directory', href: '/work' },
        { label: 'Featured Case Studies', href: '/#featured-work' },
        { label: 'GitHub Repository Archive', href: 'https://github.com/vatsalost', external: true }
      ]
    },
    {
      index: '02 // PROFILE',
      tag: 'ACADEMICS',
      label: 'ABOUT VATSAL',
      bgColor: '#161616',
      textColor: '#F5F5F0',
      links: [
        { label: 'Personal Introduction', href: '/about' },
        { label: 'Symbiosis Tech, Pune', href: '/about' },
        { label: 'Core Skills: C, C++, Java', href: '/about' }
      ]
    },
    {
      index: '03 // CONNECT',
      tag: 'COLLABORATE',
      label: 'TEAM UP',
      bgColor: '#161313',
      textColor: '#F5F5F0',
      links: [
        { label: 'Get in Touch / Contact', href: '/contact' },
        { label: 'Open to Hackathons', href: '/contact' },
        { label: 'Admin Security Console', href: '/admin' }
      ]
    }
  ];

  return (
    <header className="relative z-[1000]">
      <CardNav
        items={cardNavItems}
        ctaText="CONTACT ME"
        ctaHref="/contact"
        baseColor="#0D0D0D"
        menuColor="#F5F5F0"
        buttonBgColor="#E10600"
        buttonTextColor="#FFFFFF"
      />
    </header>
  );
}

export default Navbar;
