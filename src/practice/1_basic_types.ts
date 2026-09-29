// (1) user profile

type UserProfile = {
    name:string,
    age:number,
    isStudent:boolean
}

const user :UserProfile={
    name:"Dev",
    age:21,
    isStudent:true
}

// (2) product 

type Product = {
    name:string,
    price : number
}

const p1:Product = {name:"laptop",price:30000}
const p2:Product = {name:"mobile",price:10000}
const p3:Product = {name:"charger",price:500}
// other way to define the array of product type is
// let products: Product[] ;
// products = [p1, p2, p3];

// (3) status
type Status = "pending" | "success" | "failed"

const s1:Status = "pending"
const s2:Status = "success"
const s3:Status = "failed"
// const s4:Status = "completed" // error because we have defined the status type as union of string literals, so we can't assign any other value to it.

// (4) union 
let UserId : string |number ;
UserId = "Dev123";
UserId = 12345;

// (5) narrowing
function printId(id:string|number){
    if (typeof id === "string"){
        console.log(id.toUpperCase())
        return // if we can't write return here the last return will recive id as both value
    }
    console.log(id)
    return id //  this is only a number typr 
}

// (6) Array 
const prices : Array<number> =[];
prices.push(10)
prices.push(20)
prices.push(30)
prices.push(40)
prices.push(50)

function calculateTotal(prices:Array<number>):number{
    let sum:number = 0;
    for(let price of prices){
        sum += price
    }
    return sum 
}

// (7) Array of objects 
type Student = {
    name: string;
    marks: number;
};

const students:Student[] = [
    {name:"Dev",marks:85},
    {name:"purva",marks:88},
    {name:"Ansh",marks:70},
    {name:"Arati",marks:86},
];
//  this will modify the original array and return the first element of the sorted array
// function getTopStudents(students:Array<Student>){
//     students.sort((a,b)=>b.marks-a.marks)
//     return students[0]
// }

// simple way to get the top student without modifying the original array
function getTopStudent(students: Student[]): Student | undefined {
  // 1. If the array is empty, return undefined immediately
  if (students.length === 0) {
    return undefined; 
  }

  let topStudent: Student = students[0]!; // Use non-null assertion operator to tell TypeScript that students[0] is not undefined (! = non-null assertion operator) 

  for (const currentStudent of students) {
    if (currentStudent.marks > topStudent.marks) {
      topStudent = currentStudent;
    }
  }

  return topStudent;
}
const top = getTopStudent(students);

if (top) {
  console.log(top.name); // Works perfectly!
}

// (8) tuple 
const underInfotuple : [string,number] = ["Dev",21]
// underInfotuple = [21,"dev"] // error because we have defined the first element as string and second as number 
// but we can push new elements to the tuple but we can't change the existing elements
// underInfotuple = [22,"Jadi"] // not - valid
underInfotuple.push(22,"jadi") // valid bec. tuple is array so we can push the new elements 

// (9) readonly

const readonlyArray : readonly string[] = ["Delhi","Mumbai","Ahemdabad"]
// readonlyArray.push("Kolkata") // error because we have defined the array as readonly and we can't change the value of the array after initialization.
// readonlyArray[0] = "Chennai" 

//  (10) real miniproject
type order = {
    id:number,
    customer:string,
    amount:number,
    status: "pending" | "completed" | "cancelled"
}

const orders:order[] = [
    {id:1,customer:"Dev",amount:500,status:"completed"},
    {id:2,customer:"Arati",amount:800,status:"pending"},
    {id:3,customer:"Purva",amount:300,status:"completed"},
    {id:4,customer:"Ansh",amount:1000,status:"cancelled"},
];

function getCompletedOrders(orders:order[]):order[]{

    let completedOrders:order[] = [];
    for (const order of orders){
        if (order.status === "completed"){
            completedOrders.push(order);
        }
    }
    return completedOrders;
}

getCompletedOrders(orders)?.forEach((order)=>{
    console.log(`Order ID: ${order.id}, Customer: ${order.customer}, Amount: ${order.amount}, Status: ${order.status}`);
})

function getTotalAmount(orders:order[]):number{
    if (orders.length === 0){
        return 0;
    }
    let totalAmount:number = 0;
    for (const order of orders){
        if (order.status === "completed"){
            totalAmount += order.amount;
        }
    }
    return totalAmount;
}

console.log("total amount:", getTotalAmount(orders))