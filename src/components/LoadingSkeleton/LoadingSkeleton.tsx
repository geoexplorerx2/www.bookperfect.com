import React from 'react'

const LoadingSkeleton = () => {
  return (
    <>
    <div className='w-full h-[300px] flex items-start space-x-8 '>
      <div className="h-[190px] loading-pulse shadow rounded-md p-4 max-w-sm w-full mx-auto">
      </div>
        <div className="h-[190px] flex space-x-4 w-full">
          <div className="flex flex-col flex-1 space-y-8 py-1 justify-between">
            <div className="h-2 bg-slate-200 rounded loading-pulse"></div>
            <div className="h-2 bg-slate-200 rounded loading-pulse"></div>
            <div className="space-y-3 flex justify-center flex-col">
              <div className="h-2 bg-slate-200 rounded loading-pulse"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2 loading-pulse"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1 loading-pulse"></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2 loading-pulse"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1 loading-pulse"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded loading-pulse"></div>
            </div>
          </div>
        </div>
    </div>
      </> 
  )
}

export default LoadingSkeleton