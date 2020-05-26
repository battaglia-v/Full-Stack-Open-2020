import React from 'react'


const Display = ( {filterHandler} ) => {
     return (

          <>
               <input onChange={filterHandler} />
          </>
     )
}
 

export default Display