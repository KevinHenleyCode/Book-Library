interface InfoDataRowProps {
  subject: string
  data: string
}

const InfoDataRow = ({ subject, data }: InfoDataRowProps) => {
  return (
    <span className='mb-2 flex justify-between'>
      <b>{subject}</b>
      <p>{data}</p>
    </span>
  )
}

export default InfoDataRow
