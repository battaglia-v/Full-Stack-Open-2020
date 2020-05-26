import React from "react"


const Form = ({ 

    newName, 
    handleNameChange, 
    handleNumberChange, 
    newNumber, 
    addName
    
}) => {

        return (
            <form value={newName}>

                <div>
                    name:
          <input onChange={handleNameChange} value={newName} />
                </div>
                <div>
                    number:
          <input onChange={handleNumberChange} value={newNumber} />
                </div>
                <div>
                    <button type="submit" onClick={addName}>add</button>
                </div>
            </form>
        );
    }


export default Form




// Old Code Below: prior to refactoring 'Form' component // 

// < form
// value = { newName }
//     >

//     <h2>add a new</h2>
//     <div>
//         name:
//           <input
//             onChange={handleNameChange}
//             value={newName}
//         />
//     </div>
//     <div>
//         number:
//           <input
//             onChange={handleNumberChange}
//             value={newNumber}
//         />
//     </div>
//     <div>
//         <button
//             type="submit"
//             onClick={addName}
//         >add</button>
//     </div>
//       </form >