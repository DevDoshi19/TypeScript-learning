let subs: number | string = '1M' // unioun type
subs = 1.5 ;

let apiRequestStatus: 'pending' | 'success' | 'error' = 'pending' // union type with literal types 
// there are only 3 possible values for apiRequestStatus variable, so we can use literal types to restrict the values of apiRequestStatus variable

// apiRequestStatus = 'Failed' ; // this will give error because 'Failed' is not assignable to type 'pending' | 'success' | 'error'

let airlineSeat : 'aisle' | 'window' | 'middle' = 'window' // union type with literal types


const orders = ["10","20", "30"]
let currentorder; // this will be of type any because we have not specified the type of currentorder variable

for (let order of orders){
    if (order === "20"){
        currentorder = order ; // currentorder will be of type string because order is of type string
        break;
    }

}

currentorder =  42 // currentorder is type of any so here it will have no error but it is not a good practice to use any type because it defeats the purpose of using typescript
console.log(currentorder) // currentorder will be of type string because we have assigned a string value to it

// better code
let currentorder1: string | undefined; // this will be of type string | undefined because we have specified the type of currentorder variable
// undefined help form the error of "Variable 'currentorder1' is used before being assigned" because we are not assigning any value to currentorder1 variable at the time of declaration
for (let order of orders){
    if (order === "20"){
        currentorder1 = order ; // currentorder will be of type string because order is of type string
        break;
    }

}

console.log(currentorder1) // currentorder will be of type string | number because we have assigned a string value to it