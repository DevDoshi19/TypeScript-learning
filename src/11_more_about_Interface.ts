// interface main goal is to provide a shape for your data 
interface Chai{
    flavor : string;
    price : number;
    milk?: boolean; // optional property
}

const masalaChai : Chai = {
    flavor: "Masala",
    price: 20
}

// facing function and methods with the interface 
interface DiscountCalculator{
    (price:number):number
} // define 

const apply50 : DiscountCalculator = (p) => p*0.5

interface TeaMachine{
    start():void
    stop():void;
}
const machine:TeaMachine = {
    start(){
        console.log("start");
    },
    stop(){
        console.log("stop")
    }
}

// index signature
interface ChaiRatings{
    [flavor:string]:number; // index signature
}

const ratings:ChaiRatings = {
    masala: 4.5,
    ginger: 4.0,
    cardamom: 5.0,
};

interface ChaiRatingss {
    name: string;
    // Nest the dynamic dynamic flavor ratings inside their own object
    scores: {
        [flavor: string]: number;
    };
}

const ratingss: ChaiRatingss = {
    name: "Chai Ratings",
    scores: {
        "masala": 4.5,
        "ginger": 4.0,
        "cardamom": 5.0
    }
};

// might be we can get the interface from the library or we can create our own interface for the library
// might be we created ( we can create as many as we want with same name and it will be merged together)
// we need to satisfy all the interfaces with the same name
interface User{
    name:string
}
interface User{
    age:number
}
const u :User ={
    name: "Dev",
    age: 25
}

interface A{
    a:string
}
interface B{
    b:string
}
interface C extends A,B{
    c:string
}

const obj:C = {
    a: "A",
    b: "B",
    c: "C"
}

// generics