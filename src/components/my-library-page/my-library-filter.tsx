import ListBlock from './filter-hardware/list-block'

interface MyLibraryFilterProps {
  listName: string
  setListName: React.Dispatch<React.SetStateAction<string>>
}

/**
 * Container for all filter hardware components
 */
const MyLibraryFilter = ({ listName, setListName }: MyLibraryFilterProps) => {
  return (
    <section className='mt-10 flex w-full items-center justify-center'>
      <ListBlock listName={listName} setListName={setListName} />
    </section>
  )
}

export default MyLibraryFilter
