const NotificationDescription = ({
  message = '',
  data = [],
}: {
  message?: string
  data?: string[]
}) => {
  return (
    <div className="flex flex-col text-xs gap-[8px] w-full md:w-[300px]">
      {!!message && (
        <div>{message}</div>
        // <div className="flex justify-between items-start flex-wrap gap-[6px]">
        //   <div>Message</div>
        //   <div>{message}</div>
        // </div>
      )}
      {data.length > 0 && (
        <div className="flex flex-col gap-[2px]">
          {(data ?? []).map((item: string) => (
            <div key={`data-validation-${item}`}>{item}</div>
          ))}
        </div>
        // <div className="flex justify-between items-start flex-wrap gap-[6px]">
        //   <div>Data</div>
        //   <div className="flex flex-col gap-[2px]">
        //     {(data ?? []).map((item: string) => (
        //       <div key={`data-validation-${item}`}>{item}</div>
        //     ))}
        //   </div>
        // </div>
      )}
    </div>
  )
}

export default NotificationDescription
