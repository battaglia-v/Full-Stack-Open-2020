
    export const filterChange = (filter) => {
        return {
            type: 'SET_FILTER',
            data: {
                content: filter
            }
        }
    }
    
      export const resetFilter = () => {
          return {
              type: 'RESET_FILTER',
          }
      }



const FilterReducer = (state = null, action) => {

    switch (action.type) {
        case 'SET_FILTER':
          return action.data.content
          case 'RESET_FILTER':
			return null
        default:
          return state
       }
     }


      export default FilterReducer
