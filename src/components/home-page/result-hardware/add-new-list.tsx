import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'

interface AddNewListProps {
  handleUpdateListNames: (newListName: string) => Promise<void>
  newListName: string
  setNewListName: React.Dispatch<React.SetStateAction<string>>
}

/**
 * Handles adding a new list name to the myLists table
 */
const AddNewList = ({
  handleUpdateListNames,
  newListName,
  setNewListName,
}: AddNewListProps) => {
  return (
    <div className='mt-4 flex h-8 w-64 items-end gap-2'>
      <Input
        type='text'
        placeholder='New List'
        name='newListName'
        value={newListName}
        className='dark:bg-input/10 h-full'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewListName(e.target.value)
        }
      />

      <Button
        size={'sm'}
        variant={'outline'}
        type='submit'
        className='h-full w-fit py-3 hover:cursor-pointer'
        onClick={() => handleUpdateListNames(newListName)}
      >
        <Plus className='text-chart-2' />
      </Button>
    </div>
  )
}

export default AddNewList
