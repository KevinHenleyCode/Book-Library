import { Home, BookMarked, ListPlus } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import Link from 'next/link'
import { Button } from './ui/button'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupAction,
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

export function AppSidebar() {
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
                className='hover:cursor-pointer'
                tooltip={'Create List'}
              >
                <ListPlus />
                <span>Create List</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
