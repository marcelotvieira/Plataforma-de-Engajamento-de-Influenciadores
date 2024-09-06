"use client"
import { ReactNode, useState } from 'react'
import { Button } from './button'
import { BiLogOutCircle, BiMenu } from 'react-icons/bi'
import { NavItemsProps } from '@/types'
import { usePathname, useRouter } from 'next/navigation'
import { Sheet, SheetClose, SheetContent, SheetTrigger } from './sheet'
import { CgUser } from 'react-icons/cg'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu'
import { Card, CardContent, CardHeader } from './card'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

const MenuHeader = () => (
  <div
    className="w-full border-b text-foreground border-foreground font-normal text-sm text-center py-4 pb-8 mb-8">
    MENU
  </div>
)

const UserMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" className='hover:bg-transparent hover:text-accent'>
        <CgUser size={24} />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="text-sm p-2">
      <div className="grid gap-4">
        <div className="space-y-2">
          <DropdownMenuItem className='flex items-center gap-2 text-sm w-full p-2 rounded'>
            Perfil
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => signOut({ redirect: true, callbackUrl: "/auth" })}
            className='flex items-center gap-2 text-sm w-full p-2 rounded'>
            <BiLogOutCircle />
            Sair
          </DropdownMenuItem>
        </div>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
)

const MobileMenu = ({ items }: { items: ReactNode[] }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button
        variant="link"
        className="text-foreground hover:text-accent sm:hidden"
        size="icon"
      >
        <BiMenu size={24} />
      </Button>
    </SheetTrigger>

    <SheetContent
      side="left"
      className='bg-pinkToBlue rounded-r-lg border-none text-foreground'
    >
      <MenuHeader />
      <SheetClose>
        {items}
      </SheetClose>
    </SheetContent>
  </Sheet>
)

interface ISideMenuProps {
  children: ReactNode
  items: NavItemsProps[]
}


export default function SideMenu({ children, items }: ISideMenuProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const pathName = usePathname()
  const router = useRouter()

  const navItemsDynamicElements: ReactNode[] = items.map((i, index) => (
    <Button asChild key={index}
      className={
        `hover:bg-background bg-transparent  rounded-full rounded-l-none w-full border-l-4 mb-4 border-transparent ${i.href === pathName && " border-foreground"}`
      }
    >
      <button
        // avoiding tags like Link, Image, etc...
        onClick={i.href !== pathName ? () => router.push(i.href) : undefined}
        className='flex items-center gap-2 overflow-hidden text-xs !justify-start'
      >
        {i.icon}
        {isExpanded && <p className='text-foreground'>{i.label.toUpperCase()}</p>}
      </button>
    </Button>
  ))

  return (
    <div className="">
      <header className="flex w-full sm:fixed sm:top-0 z-10 bg-background p-3 items-center justify-between">
        <Button
          variant="link"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-foreground hover:text-accent hidden sm:flex" size="icon">
          <BiMenu size={24} />
        </Button>

        <MobileMenu items={navItemsDynamicElements} />
        <UserMenu />
      </header>

      <div className="flex h-[93vh]">
        <div
          className={`bg-pinkToBlue hidden sm:fixed sm:left-0 sm:top-16 h-full sm:block rounded-md shadow-custom text-white p-1 overflow-hidden transition-all duration-300 ${isExpanded ? 'w-64' : 'w-16'}`}
        >
          <MenuHeader />
          {navItemsDynamicElements}
        </div>

        <main className={`w-full px-4 sm:px-6 min-h-full ${isExpanded ? "sm:ml-64" : "sm:ml-16"} duration-300 sm:mt-16 transition-all`}>
          {children}
        </main>
      </div>
    </div>
  )
}
