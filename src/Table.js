import React from 'react'
import './Table.css'
function Table({data}) {
    console.log(data)
    const uidata = data.map((curr,index)=>{
        return( <tr key={index} >
            <td>{curr.name}</td>
               <td>{curr.cases}</td>
           </tr>)
    })
    return (
        <div className="main" style={{height:'300px',overflow:'scroll'}}>
           <table className="table">
               
              {uidata}
            
           </table>
        </div>
    )
}

export default Table
