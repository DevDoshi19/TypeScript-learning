class Chai {
    flavor :string;
    // price : number;

    // constructor(flavor:string, price:number){
    //     this.flavor = flavor;
    //     this.price = price;
    // }
    constructor(flavor:string){
        this.flavor = flavor;
        console.log(this);
    }
}

const masalaChai = new Chai("Masala");
masalaChai.flavor = "Ginger";

// access modifiers 
// same as JavaScript, but with additional type safety

class Chaii{
    public flavor :string= "Masala";
    private sercetIngredients :string= "Cardamon";

    reveal(){
        return this.sercetIngredients; 
    }
    
}

class Shop{
    protected shopName :string = "Chai Shop";

}

class Branch extends Shop{
    getName(){
        return this.shopName;
    }
}

const c = new Chaii();
c.reveal(); // Cardamon

new Branch().getName(); // we can access the protected property of the parent class from the child class


class Wallet{
    // private
    #balance : number = 0;
    getBalance(){
        return this.#balance
    }

}

const w = new Wallet().getBalance(); // 0

class Capacity{
    readonly capacity : number;
    constructor(capacity:number){
        this.capacity = capacity;
    }
    // controlled gates which are getters and setters
    set Capacity(capacity:number){
        // this.capacity = capacity; // Error: Cannot assign to 'capacity' because it is a read-only property.
    }
    get Capacity(){
        return this.capacity;
    }
}

class ModernChai{
    private _sugar = 2;
    get sugar(){
        return this._sugar;
    }
    set sugar(value:number){
        if (value >5) throw new Error("Too sweet");
        this._sugar = value
    }
}

const new_c = new ModernChai()
new_c.sugar = 3


// static properties and methods
class EkChai {
    static shopName = "Chai code caffe"

    constructor(public flavour:string){}
}

console.log(EkChai.shopName) // when after a . we can get value that means that value is static and we can access it without creating an instance of the class


// abstract class 
abstract class Drink{
    abstract make():void;
}
class MyChai extends Drink{
    make(){
        console.log("Making Chai");
    }
}
class HerChai extends Drink{
    make(){
        console.log("Making Her Chai");
    }
}

// composition 
class Heater{
    heat(){}
}
class ChaiMaker{
    constructor(private heater:Heater){}
    make(){
        this.heater.heat();
    }
}
