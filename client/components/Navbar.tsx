'use client';

import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from '@nextui-org/react';

import { ThemeMenuButton } from './ThemeMenuButton';

import LogoutButton from './LogoutButton';

export default function Header() {
  const params = useParams();
  const router = useRouter();

  const role = Array.isArray(params.role) ? params.role[0] : params.role;
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;

  return (
    <Navbar shouldHideOnScroll maxWidth="full" className="md:px-[3.3rem]">
      <NavbarBrand>
        <p className="text-2xl font-bold bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Assets Hub
        </p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeMenuButton />
        </NavbarItem>

        {(role === 'staff' || role === 'student') && userId && (
          <NavbarItem>
            <LogoutButton />
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
