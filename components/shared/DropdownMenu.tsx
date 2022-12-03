import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/20/solid";
import { Database } from "../../db_types";
import { getMyProfile } from "../../fetchers/getProfile";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const DropdownMenu = () => {

      const user = useUser();

      console.log(user);
      const supabaseClient = useSupabaseClient<Database>();

      const {data:profile, isLoading, isSuccess, isError} = useQuery(['profile'], () => getMyProfile(user?.id!))

      console.log({profile, isLoading, isSuccess, isError})

  return (
    <div className="px-4 py-1 rounded-full bg-slate-700 flex space-x-3">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex items-center w-full justify-center px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <Bars3Icon className="text-white h-8 w-8" />

            <ChevronDownIcon
              className="ml-2 -mr-1 h-8 w-8 rounded-full bg-white text-slate-800 hover:text-violet-500"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-80"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-200"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-80"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 md:w-[400px] origin-top-right divide-y divide-gray-100 rounded-md bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? " text-slate-100" : "text-gray-200"
                    } group flex bg-slate-800 w-full items-center rounded-md px-2 py-2 text-sm space-x-4`}
                  >
                    {profile?.avatar === null ? (
                      <UserCircleIcon className="bg-white text-slate-800 rounded-full p-1 h-7 w-7" />
                    ) : (
                      !!profile?.avatar.url && (
                        <Image
                          src={profile?.avatar.url}
                          width={profile?.avatar.width}
                          height={profile?.avatar.height}
                          alt={profile?.username}
                          className="w-8 h-8 aspect-square rounded-full object-cover"
                        />
                      )
                    )}
                    <p className="text-white text-lg font-medium">{profile?.username}</p>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export default DropdownMenu;
