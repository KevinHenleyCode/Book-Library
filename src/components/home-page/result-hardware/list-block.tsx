import { useState, useEffect } from 'react'
import type { BookList } from '@/types/list'
import { getAllListNames, updateListNames } from '@/lib/listServices'
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
import AddNewList from './add-new-list'

interface ListBlockProps {
  userName: string
}

/**
 * Handles creation of new lists and adding books to current ones
 */
const ListBlock = ({ userName }: ListBlockProps) => {
  const [allLists, setAllLists] = useState<BookList[]>()
  const [newListName, setNewListName] = useState('')

  const handleGetAllListNames = async () => {
    try {
      const { success, data } = await getAllListNames()

      if (success) {
        setAllLists(data)
      }
    } catch (err) {
      console.log(`Couldn't get ListNames: ${err}`)
    }
  }

  const handleUpdateListNames = async (newListName: string) => {
    try {
      if (userName) {
        await updateListNames(newListName, userName)
        await handleGetAllListNames()
        setNewListName('')
      }
    } catch (err) {
      console.log(`Couldn't update ListNames: ${err}`)
    }
  }

  useEffect(() => {
    handleGetAllListNames()
  }, [])
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>OPEN</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Custom Lists</DrawerTitle>
          <DrawerDescription>
            Add your own lists to further organize your collection:
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className='mx-auto w-64 rounded-md border'>
          <div className='p-4'>
            <h4 className='text-muted-foreground mb-4 font-semibold'>LISTS:</h4>
            {allLists?.map((allLists, idex) => (
              <div key={idex}>
                {allLists.listNames?.map((name, nameIndex) => (
                  <div key={nameIndex}>
                    <span className='flex items-end'>
                      <Checkbox id={name} className='mr-2 h-5 w-5' />
                      <Label
                        htmlFor={name}
                        className='text-md align-text-bottom'
                      >
                        {name}
                      </Label>
                    </span>
                    <Separator className='bg-muted mb-1' />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
        <DrawerFooter className='flex w-full flex-col items-center justify-between'>
          <AddNewList
            handleUpdateListNames={handleUpdateListNames}
            newListName={newListName}
            setNewListName={setNewListName}
          />
          <DrawerClose asChild className='mt-8 w-fit'>
            <Button variant={'destructive'} className='hover:cursor-pointer'>
              CANCEL
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ListBlock
