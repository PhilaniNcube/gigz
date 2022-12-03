import Link from 'next/link';
import { useRouter } from 'next/router';
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline'
import React from 'react'
import { useSessionContext, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Database } from '../../db_types';
import DropdownMenu from './DropdownMenu';

const Navbar = () => {

    const { isLoading, session, error } = useSessionContext();
    const user = useUser();

    console.log(user)
    const supabaseClient = useSupabaseClient<Database>();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <header className="bg-transparent backdrop-blur-lg py-4 px-4 md:px-8 fixed top-0 left-0 right-0">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/" className="text-white text-lg font-medium">
          Gigz
        </Link>
        <form className="flex-1 flex justify-center">
          <div className="max-w-xl w-full mx-auto relative isolate">
            <input
              type="text"
              className="rounded-full px-8 py-1 w-full text-white bg-transparent focus:outline-none focus:ring-0 focus:border-slate-100"
            />
            <div className="absolute inset-0 flex items-center justify-start px-3 pointer-events-none">
              <MagnifyingGlassIcon className="text-white h-4 w-4 " />
            </div>
          </div>
        </form>

        <div className="flex items-center">
          {!session ? (
            <>
              <Link
                href="/sign-in"
                className="text-white bg-yellow-400 rounded-full px-6 w-fit py-1"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="text-white ml-3 bg-green-400 rounded-full px-6 w-fit py-1"
              >
                Sign Up
              </Link>
            </>
          ) : (
           <DropdownMenu />
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar
