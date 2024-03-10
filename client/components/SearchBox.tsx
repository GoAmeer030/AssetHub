'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';

import { SearchIcon } from './icons/SearchIcon';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { LogoutIcon } from './icons/LogoutIcon';

export default function SearchBox() {
  const { setTheme } = useTheme();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <p
        className="text-sm text-muted-foreground border-1 p-2 rounded-md flex gap-2 cursor-pointer hover:bg-muted hover:text-muted-foreground transition-colors duration-200 ease-in-out items-center"
        onClick={(e) => setOpen(true)}
      >
        <p className="hidden md:block">Search </p>
        <span className="md:hidden">
          <SearchIcon />
        </span>
        <kbd className="hidden pointer-events-none md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">ctrl + J</span>
        </kbd>
      </p>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup title="Theme">
            <CommandItem
              onClick={() => {
                setTheme('light');
              }}
            >
              <SunIcon className="mr-2 h-4 w-4" />
              <span>Light mode</span>
            </CommandItem>
            <CommandItem
              onClick={() => {
                setTheme('dark');
              }}
            >
              <MoonIcon className="mr-2 h-4 w-4" />
              <span>Dark mode</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup title="Actions">
            <CommandItem className="hover:bg-danger">
              <LogoutIcon className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
