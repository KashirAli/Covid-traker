import {Circle} from 'google-maps-react'
export const SortDData = (data)=>{
    const sortedData = [...data];
    console.log("sortDdata")
    return sortedData.sort((a,b)=>(a.cases>b.cases)? -1:1)
}
export const SortAData = (data)=>{
    const sortedData = [...data];
    console.log("sortAdata")

    return sortedData.sort((a,b)=>(a.cases<b.cases)? -1:1)
}

