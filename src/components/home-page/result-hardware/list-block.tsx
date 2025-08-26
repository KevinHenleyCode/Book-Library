import { useState, useEffect, useCallback } from 'react'
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
import type { GoogleBook } from '@/types/book'
import { getAllLists } from '@/lib/libraryServices'
import { BookmarkPlus } from 'lucide-react'

interface ListBlockProps {
  userName: string
  inLibrary: boolean
  book: GoogleBook
  handleSaveToMyLibrary: (
    googleBook: GoogleBook,
    saveToList: string[],
  ) => Promise<void>
}

/**
 * Handles creation of new lists and adding books to current ones
 */
const ListBlock = ({
  userName,
  // inLibrary,
  book,
  handleSaveToMyLibrary,
}: ListBlockProps) => {
  const [allMyLists, setAllMyLists] = useState<Set<string>>(new Set())
  const [newListName, setNewListName] = useState('')
  const [currentBookLists, setCurrentBookLists] = useState<Set<string>>(
    new Set(),
  )

  const handleGetAllListNames = useCallback(async () => {
    try {
      const listTableResults = await getAllListNames()
      const currentBookListResults = await getAllLists(book.id)

      if (listTableResults.success) {
        setAllMyLists(
          new Set(
            listTableResults.data?.flatMap((list) => list.listNames ?? []) ||
              [],
          ),
        )
      }

      setCurrentBookLists(new Set(currentBookListResults.data) || [])
    } catch (err) {
      console.log(`Couldn't get ListNames: ${err}`)
    }
  }, [book.id])

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
  }, [handleGetAllListNames])
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className='hover:text-chart-2 absolute -right-4 transition-all duration-200 ease-in-out hover:cursor-pointer'>
          <BookmarkPlus />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Custom Lists</DrawerTitle>
          <DrawerDescription>
            Add your own lists to further organize your collection:
          </DrawerDescription>
        </DrawerHeader>
        <Button
          onClick={() =>
            handleSaveToMyLibrary(book, Array.from(currentBookLists))
          }
          className='mx-auto mb-4 w-fit hover:cursor-pointer'
        >
          Add to Default List
        </Button>
        <ScrollArea className='mx-auto w-64 rounded-md border'>
          <div className='p-4'>
            <h4 className='text-muted-foreground mb-4 text-center font-semibold'>
              CUSTOM LISTS:
            </h4>
            {Array.from(allMyLists).map((availableList, index) => (
              <div key={index}>
                <span className='flex items-end'>
                  <Checkbox
                    id={availableList}
                    checked={currentBookLists.has(availableList)}
                    onCheckedChange={(checked) => {
                      const updatedBookLists = new Set(currentBookLists)
                      if (checked) {
                        updatedBookLists.add(availableList)
                      } else {
                        updatedBookLists.delete(availableList)
                      }
                      setCurrentBookLists(updatedBookLists)
                      handleSaveToMyLibrary(book, Array.from(updatedBookLists))
                    }}
                    className='mr-2 h-5 w-5'
                  />
                  <Label
                    htmlFor={availableList}
                    className='text-md align-text-bottom'
                  >
                    {availableList}
                  </Label>
                </span>
                <Separator className='bg-muted mb-1' />
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
            <Button variant={'secondary'} className='hover:cursor-pointer'>
              CLOSE
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default ListBlock
