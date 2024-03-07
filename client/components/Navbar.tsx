'use client';

import { useState } from 'react';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';

import { useRoleIdStore } from '@/stores/roleIdStore';
import { useStaffStore } from '@/stores/usersStore/staffStore';
import { useStudentStore } from '@/stores/usersStore/studentStore';

import LogoutButton from '@/components/LogoutButton';
import AddTopicButton from '@/components/AddTopicButton';

import { ThemeMenuButton } from '@/components/ThemeMenuButton';

export default function Header() {
  const { photo, staffName, designation } = useStaffStore();
  const { regNo } = useStudentStore();
  const { role, id } = useRoleIdStore();

  let photoUrl = photo;
  if (photoUrl === '') {
    photoUrl = '';
  } else {
    photoUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/${photo}`;
  }
  let regNum = regNo.toString();
  regNum = regNum.substring(10);

  const [dialogTrigger, setDialogTrigger] = useState(false);

  return (
    <Navbar shouldHideOnScroll maxWidth="full" className="md:px-[3.3rem]">
      <NavbarBrand>
        <p className="text-clamp text-2xl font-bold bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Assets Hub
        </p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {role === 'staff' && (
          <NavbarItem>
            <div className="flex flex-col justify-between gap-3 md:gap-6 h-full min-w-fit">
              <AddTopicButton setDialogTrigger={setDialogTrigger} />
            </div>
          </NavbarItem>
        )}
        <NavbarItem>
          <ThemeMenuButton />
        </NavbarItem>
        {(role === 'staff' || role === 'student') && id && (
          <NavbarItem className="cursor-pointer">
            <Dropdown placement="bottom-start" backdrop="blur">
              <DropdownTrigger>
                <div className="flex gap-4 items-center">
                  <Avatar
                    size="sm"
                    isBordered
                    color="primary"
                    as="button"
                    className="transition-transform"
                    src={photoUrl}
                    name={role === 'student' ? regNum : 'DP'}
                  />

                  <div className="hidden sm:flex flex-col h-auto">
                    <p className="font-semibold text-sm mt-2 max-w-[15ch] overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {role === 'student' ? regNo : staffName}
                    </p>
                    <p className="text-foreground/50 text-[0.7rem] -mt-1 max-w-[12ch] overflow-hidden whitespace-nowrap overflow-ellipsis">
                      {role === 'staff' ? designation : 'Student'}
                    </p>
                  </div>
                </div>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem className="flex flex-col sm:hidden gap-1 items-start justify-center">
                  <p className="font-semibold text-sm">
                    {role === 'student' ? regNo : staffName}
                  </p>
                  <p className="text-foreground/50 text-[0.7rem]">
                    {role === 'staff' ? designation : 'Student'}
                  </p>
                </DropdownItem>
                <DropdownItem color="danger">
                  <LogoutButton />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
