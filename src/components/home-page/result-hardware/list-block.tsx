import { useState, useEffect } from 'react'
import type { BookList } from '@/types/list'
import { getAllListNames } from '@/lib/listServices'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

/**
 * Handles creation of new lists and adding books to current ones
 */
const ListBlock = () => {
  const [customListRow, setCustomListRow] = useState<BookList[]>()

  const handleGetAllListNames = async () => {
    try {
      const { success, data } = await getAllListNames()

      if (success) {
        setCustomListRow(data)
      }
    } catch (err) {
      console.log(`Couldn't get ListNames: ${err}`)
    }
  }

  useEffect(() => {
    handleGetAllListNames()
  }, [])
  return (
    <Drawer>
      <DrawerTrigger>
        <Button>OPEN</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Custom Lists</DrawerTitle>
          <DrawerDescription>
            Add your own lists to further organize your collection:
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className='mx-auto w-fit rounded-md border'>
          <div className='p-4'>
            <h4 className='text-muted-foreground mb-4 font-semibold'>LISTS:</h4>
            {customListRow?.map((customLists, idex) => (
              <div key={idex}>
                {customLists.listNames?.map((name, nameIndex) => (
                  <div key={nameIndex}>
                    <span className='flex'>
                      <Checkbox id={name} className='mr-2' />
                      <Label htmlFor={name}>{name}</Label>
                    </span>
                    <Separator className='bg-muted my-1' />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
        <DrawerFooter>
          <DrawerClose>CANCEL</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ListBlock
