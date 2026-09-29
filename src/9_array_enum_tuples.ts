const chaiFlavours: String[] = ["Masala","Adhrak","Ginger"]
const price:number[] = [10,20,15]

const rating : Array<number> = [4.5,5.0,3.2]
// we can also use custom data types 
type size = "small"| "large" | "medium"

// const cupsize : Array<size> = ["large","medium","abc"] // gives error when try to insert another value  

const cupsize : Array<size> = ["large","medium"]

// array object 
type Chai = {
    name:string;
    price:number;
}

const menu: Chai[] = [
    {name:"Masala",price:10},
    {name:"Adhrak",price:20},
    {name:"Ginger",price:15}
]

// readonly array - where we can't change the value of the array after initialization
const cities: readonly string[] = ["Delhi","Mumbai","Kolkata"]
// cities.push("Chennai") // gives error because we have marked the array as readonly and we can't change the value of the array after initialization.


// multidimensional array
const table:number[][] = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]

// tuple - where we can have fixed number of elements with different data types

let chaiTuple: [string,number];
chaiTuple = ["Masala",10] // valid
// chaiTuple = [10,"Masala"] // invalid because we have defined the first element as string and second as number
chaiTuple.push("Adhrak") // valid because we can push new elements to the tuple but we can't change the existing elements 

let userInfo: [string,number,boolean?] = ["Dev",21,true]
userInfo = ["Jadi",21] // valid because we have defined the third element as optional

const location : readonly [number,number] = [28.7041,77.1025]


// named tuple - where we can have fixed number of elements with different data types and we can also give names to the elements of the tuple
const chaiItems: [name:string,price:number] = ["Masala",10]



// enum - where we can have a set of named constants
enum ChaiSize {
    SMALL,
    MEDIUM,
    LARGE
}

const sizee = ChaiSize.SMALL // 0

enum Status {
    PENDING = 100,
    SERVED , // AUTOMATICALLY ASSIGNED 101
    CANCELLED // AUTOMATICALLY ASSIGNED 102
}

enum ChaiType {
    MASALA = "masala",
    GINGER = "ginger",
    GREEN = "green"
}

function makeChai(type:ChaiType,cups:number){
    console.log(`Making ${cups} cups of ${type} chai`)
}

makeChai(ChaiType.MASALA, 2)
makeChai(ChaiType.GINGER, 3)
makeChai(ChaiType.GREEN, 1)

// hetrogeneous enum - where we can have a set of named constants with different data types
// not best practice to use hetrogeneous enum because it can lead to confusion and errors in the code, so we should avoid using hetrogeneous enum in our code.
enum ChaiStatus {
    PENDING = "pending",
    SERVED = 1,
    CANCELLED = "cancelled"
}

// can't change the value of the enum after initialization because we have marked it as const enum
const enum Sugar{
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3
}

