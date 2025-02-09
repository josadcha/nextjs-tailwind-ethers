import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import Image from 'next/image'
import { useRouter } from 'next/router'
import type { Dispatch, SetStateAction } from 'react'
import { Fragment, useMemo, useRef } from 'react'
import navigation from '../../configs/navigation'
import useWallet from '../../hooks/useWallet'
import Account from '../Account'

type Props = {
  open: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export default function Navigation({
  open,
  setSidebarOpen,
}: Props): JSX.Element {
  const { active } = useWallet()
  const router = useRouter()
  const navs = useMemo(() => {
    return navigation.main.filter((item) => item.sidebar)
  }, [])
  const ctaButtonRef = useRef(null)
  const isActivePath = (path: string) => router.pathname === path

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 flex z-10 flex-row-reverse md:hidden"
          initialFocus={ctaButtonRef}
          open={open}
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="-translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 left-0 -ml-12 pt-2">
                  <button
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex px-4">
                <Image
                  className="h-8 w-auto"
                  src="/images/logo.svg"
                  alt="App"
                  width={175}
                  height={32}
                />
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navs.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        isActivePath(item.href)
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                      )}
                    >
                      <item.icon
                        className={classNames(
                          isActivePath(item.href)
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'mr-4 flex-shrink-0 h-6 w-6',
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
              <div
                className={classNames([
                  'flex justify-center',
                  !active ? 'md:pb-2 lg:pb-4' : '',
                ])}
              >
                <Account />
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-16 lg:w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="hidden lg:block">
                <Image
                  className="h-8 w-auto"
                  src="/images/logo.svg"
                  alt="App"
                  width={175}
                  height={32}
                />
              </div>
              <div className="lg:hidden">
                <Image
                  className="h-8 w-auto"
                  src="/images/logo-icon.svg"
                  alt="App"
                  width={64}
                  height={64}
                />
              </div>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 bg-white space-y-1">
                {navs.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      isActivePath(item.href)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex px-2 py-2 text-sm font-medium rounded-md justify-center lg:justify-start',
                    )}
                  >
                    <item.icon
                      className={classNames(
                        isActivePath(item.href)
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        'flex-shrink-0 h-6 w-6',
                      )}
                      aria-hidden="true"
                    />
                    <span className="ml-3 hidden lg:inline">{item.name}</span>
                  </a>
                ))}
              </nav>
            </div>
            <div
              className={classNames([
                'flex justify-center',
                !active ? 'md:pb-2 lg:pb-4' : '',
              ])}
            >
              <Account contentClassNames="hidden lg:block" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
