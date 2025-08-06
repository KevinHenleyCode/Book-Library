'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Home, BookMarked, ListPlus, Moon, Sun } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from '@/components/ui/sidebar'

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Library',
    url: '/my/library',
    icon: BookMarked,
  },
]

/**
 * The component housing navigation and commonly used items
 */
export function AppSidebar() {
  const [themeBtn, setThemeBtn] = useState(true)

  const { setTheme } = useTheme()

  const themeToggle = (theme: boolean) => {
    setThemeBtn(!themeBtn)
    setTheme(theme === true ? 'dark' : 'light')
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className='absolute bottom-4 w-full'>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={'Create List'}
                className='hover:cursor-pointer'
              >
                <ListPlus />
                <span>Create List</span>
              </SidebarMenuButton>
              <SidebarMenuButton
                onClick={() => themeToggle(!themeBtn)}
                variant={'outline'}
                tooltip={'Theme'}
                className='hover:cursor-pointer'
              >
                {themeBtn ? (
                  <Moon className='text-chart-4' />
                ) : (
                  <Sun className='text-chart-4' />
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
