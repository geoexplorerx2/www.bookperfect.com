 // this function take an array of objects, inside the object a numeric index property should exist, and then sorts objects in ascending order
 const sortByIndex = (array: any) => {
    const sortedArray =  array.sort(({index: a} : any, {index: b} : any) => a-b)
    return sortedArray
   }
   
export default sortByIndex