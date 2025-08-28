import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select'
import { useState, useEffect } from 'react'
import { getAllListNames } from '@/lib/listServices'

interface ListBlockProps {
  listName: string
  setListName: React.Dispatch<React.SetStateAction<string>>
}

/**
 * Controls the list selection dropdown
 */
const ListBlock = ({ listName, setListName }: ListBlockProps) => {
  const [lists, setLists] = useState<string[]>([])

  const handleGetAllListNames = async () => {
    const { success, data } = await getAllListNames()

    if (success) {
      setLists(data?.flatMap((list) => list.listNames) ?? [])
    } else {
      setLists([])
    }
  }

  useEffect(() => {
    handleGetAllListNames()
  }, [])
  return (
    <div>
      <Select value={listName} onValueChange={(value) => setListName(value)}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='All Categories' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>List:</SelectLabel>
            <SelectItem defaultValue={'All Books'} value='All Books'>
              All Books
            </SelectItem>
            {lists.map((list) => {
              return (
                <SelectItem key={list} value={list}>
                  {list}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
export default ListBlock
