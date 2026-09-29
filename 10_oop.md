# Object-Oriented Programming (OOP) in TypeScript

Object-Oriented Programming (OOP) is a programming approach where we organize code around **objects that contain data and behavior**.

TypeScript supports the major OOP concepts found in languages like Java, while also providing JavaScript-compatible features.

This file covers:

- Classes
- Constructors
- Access modifiers
- `public`
- `private`
- `protected`
- JavaScript `#private` fields
- `readonly`
- Getters and setters
- Static properties
- Parameter properties
- Abstract classes
- Composition

---

# 1. Classes

A class is a blueprint for creating objects.

```ts
class Chai {
    flavor: string;

    constructor(flavor: string) {
        this.flavor = flavor;
    }
}
```

Now we can create objects from the class:

```ts
const masalaChai = new Chai("Masala");
```

The object contains:

```text
masalaChai
    │
    └── flavor → "Masala"
```

We can access and modify the property:

```ts
masalaChai.flavor = "Ginger";
```

---

# 2. Constructor

The constructor runs automatically when a new object is created.

```ts
class Chai {
    flavor: string;

    constructor(flavor: string) {
        this.flavor = flavor;
    }
}
```

When we write:

```ts
const chai = new Chai("Masala");
```

TypeScript/JavaScript roughly performs:

```text
new Chai("Masala")
       ↓
constructor("Masala")
       ↓
this.flavor = "Masala"
       ↓
object created
```

The constructor is mainly used to initialize the object's state.

---

# 3. `this`

Inside a class, `this` refers to the **current object instance**.

```ts
class Chai {
    flavor: string;

    constructor(flavor: string) {
        this.flavor = flavor;
    }
}
```

Here:

```ts
this.flavor
```

means:

> The `flavor` property belonging to this particular object.

For example:

```ts
const masala = new Chai("Masala");
const ginger = new Chai("Ginger");
```

Conceptually:

```text
masala
 └── flavor → "Masala"

ginger
 └── flavor → "Ginger"
```

Both objects come from the same class but maintain their own state.

---

# 4. Access Modifiers

TypeScript provides access modifiers to control how class members can be accessed.

The main modifiers are:

```text
public
private
protected
```

Mental model:

```text
                public
                  │
        ┌─────────┼─────────┐
        │         │         │
      class     child     outside

                protected
                  │
             class + child

                 private
                   │
                class only
```

---

# 5. `public`

`public` means the property or method can be accessed from anywhere.

```ts
class Chai {
    public flavor: string = "Masala";
}
```

We can access it directly:

```ts
const chai = new Chai();

console.log(chai.flavor);
```

We can also modify it:

```ts
chai.flavor = "Ginger";
```

`public` is the default visibility for class members.

So:

```ts
class Chai {
    flavor: string = "Masala";
}
```

is effectively public.

---

# 6. `private`

`private` means the member can only be accessed from inside the class.

```ts
class Chai {
    public flavor: string = "Masala";

    private secretIngredients: string = "Cardamom";

    reveal() {
        return this.secretIngredients;
    }
}
```

This works:

```ts
const chai = new Chai();

chai.reveal();
```

because `reveal()` is inside the class and can access:

```ts
this.secretIngredients
```

But this is not allowed:

```ts
chai.secretIngredients;
```

because `secretIngredients` is private.

### Mental Model

```text
private
   ↓
Class
 ┌───────────────┐
 │ secret data   │
 │ secret method │
 └───────────────┘
        ↓
Outside cannot directly access
```

This is useful for hiding implementation details.

---

# 7. `protected`

`protected` is similar to `private`, but child classes can also access it.

```ts
class Shop {
    protected shopName: string = "Chai Shop";
}

class Branch extends Shop {
    getName() {
        return this.shopName;
    }
}
```

The child class `Branch` can access:

```ts
this.shopName
```

because `shopName` is protected.

But outside code cannot directly access it:

```ts
const branch = new Branch();

// branch.shopName ❌
```

### Difference

```text
              public     protected     private
------------------------------------------------
Same class       ✅          ✅            ✅
Child class      ✅          ✅            ❌
Outside          ✅          ❌            ❌
```

---

# 8. JavaScript `#private`

JavaScript also has true private class fields using `#`.

```ts
class Wallet {
    #balance: number = 0;

    getBalance() {
        return this.#balance;
    }
}
```

We can use:

```ts
const wallet = new Wallet();

wallet.getBalance();
```

But:

```ts
wallet.#balance;
```

is not allowed outside the class.

The important difference is that `#balance` is a **JavaScript runtime private field**, not just a TypeScript access restriction.

---

# 9. `private` vs `#private`

Both provide encapsulation, but they work differently.

```ts
class Wallet {
    private balance: number = 0;
}
```

versus:

```ts
class Wallet {
    #balance: number = 0;
}
```

Mental model:

```text
private
   ↓
TypeScript access control

#private
   ↓
JavaScript runtime private field
```

For normal TypeScript development, both can be useful depending on the design.

---

# 10. `readonly`

`readonly` prevents a property from being reassigned after initialization.

```ts
class Capacity {
    readonly capacity: number;

    constructor(capacity: number) {
        this.capacity = capacity;
    }
}
```

This is allowed:

```ts
const capacity = new Capacity(100);
```

But later:

```ts
capacity.capacity = 200;
```

is not allowed.

### Mental Model

```text
readonly
    ↓
Can initialize
    ↓
Can read
    ↓
Cannot reassign
```

`readonly` is useful when a value should remain fixed after an object has been created.

---

# 11. Getters and Setters

Getters and setters allow us to control access to a property.

Example:

```ts
class ModernChai {
    private _sugar = 2;

    get sugar() {
        return this._sugar;
    }

    set sugar(value: number) {
        if (value > 5) {
            throw new Error("Too sweet");
        }

        this._sugar = value;
    }
}
```

Now we can write:

```ts
const chai = new ModernChai();

chai.sugar = 3;
console.log(chai.sugar);
```

Even though `_sugar` is private, we expose controlled access through:

```text
getter → read
setter → write
```

---

# 12. Why Getters and Setters?

Without validation:

```ts
chai.sugar = 100;
```

could create an invalid state.

With a setter:

```ts
set sugar(value: number) {
    if (value > 5) {
        throw new Error("Too sweet");
    }

    this._sugar = value;
}
```

the class controls what values are allowed.

Mental model:

```text
Outside
   │
   │ chai.sugar = 6
   ↓
 setter
   │
   ├── valid → update
   │
   └── invalid → reject
```

This is a basic form of **encapsulation**.

---

# 13. Static Properties

Normally, a property belongs to each object instance.

```ts
class Chai {
    flavor: string;

    constructor(flavor: string) {
        this.flavor = flavor;
    }
}
```

Each object has its own `flavor`.

But sometimes we want a value that belongs to the **class itself**, not individual objects.

That's where `static` comes in.

```ts
class EkChai {
    static shopName = "Chai Code Caffe";

    constructor(public flavor: string) {}
}
```

We access the static property through the class:

```ts
console.log(EkChai.shopName);
```

Not:

```ts
const chai = new EkChai("Masala");

chai.shopName; // ❌
```

### Mental Model

```text
Class
 │
 ├── static shopName
 │
 └── instances
       ├── chai 1
       ├── chai 2
       └── chai 3
```

Static members belong to the class itself.

---

# 14. Static Methods

Methods can also be static.

```ts
class MathUtil {
    static add(a: number, b: number) {
        return a + b;
    }
}
```

We call:

```ts
MathUtil.add(10, 20);
```

We don't need:

```ts
new MathUtil();
```

Static methods are useful when behavior belongs to the class rather than to a particular object.

---

# 15. Parameter Properties

TypeScript provides a shorthand for declaring and initializing constructor properties.

Instead of:

```ts
class EkChai {
    flavor: string;

    constructor(flavor: string) {
        this.flavor = flavor;
    }
}
```

we can write:

```ts
class EkChai {
    constructor(public flavor: string) {}
}
```

TypeScript automatically creates the property and assigns the constructor argument.

We can also use modifiers:

```ts
class Wallet {
    constructor(
        private balance: number,
        public owner: string
    ) {}
}
```

This is called a **parameter property**.

It reduces boilerplate.

---

# 16. Abstract Classes

An abstract class is a base class that is not meant to be directly instantiated.

```ts
abstract class Drink {
    abstract make(): void;
}
```

The class says:

> Every concrete drink must provide a `make()` method.

A child class implements it:

```ts
class MyChai extends Drink {
    make() {
        console.log("Making Chai");
    }
}
```

Another child class:

```ts
class HerChai extends Drink {
    make() {
        console.log("Making Her Chai");
    }
}
```

We cannot do:

```ts
new Drink();
```

because `Drink` is abstract.

---

# 17. Abstract Methods

An abstract method has no implementation in the abstract class.

```ts
abstract class Drink {
    abstract make(): void;
}
```

The child class must implement it:

```ts
class MyChai extends Drink {
    make() {
        console.log("Making Chai");
    }
}
```

If a child class doesn't implement the required abstract method, TypeScript reports an error.

### Mental Model

```text
abstract class Drink
        │
        │
        ├── MyChai
        │     └── make()
        │
        └── HerChai
              └── make()
```

The parent defines the **contract**.

The child defines the **implementation**.

---

# 18. Composition

Composition means building an object by giving it other objects as dependencies.

Example:

```ts
class Heater {
    heat() {}
}

class ChaiMaker {
    constructor(private heater: Heater) {}

    make() {
        this.heater.heat();
    }
}
```

Here `ChaiMaker` uses a `Heater`.

Instead of inheriting from `Heater`:

```text
ChaiMaker IS-A Heater
```

we have:

```text
ChaiMaker HAS-A Heater
```

This is the key idea behind composition.

```text
ChaiMaker
    │
    └── has a
          ↓
       Heater
```

---

# 19. Inheritance vs Composition

### Inheritance

```ts
class Branch extends Shop {}
```

means:

```text
Branch IS-A Shop
```

The child inherits behavior/state from the parent.

### Composition

```ts
class ChaiMaker {
    constructor(private heater: Heater) {}
}
```

means:

```text
ChaiMaker HAS-A Heater
```

The class receives another object and uses it.

A useful rule:

```text
IS-A  → inheritance

HAS-A → composition
```

---

# 20. Encapsulation

Several concepts in this file work together to provide encapsulation.

For example:

```ts
class Wallet {
    private balance = 0;

    getBalance() {
        return this.balance;
    }
}
```

The internal state is protected from direct modification.

Instead of:

```text
Outside
   ↓
directly modify balance ❌
```

we have:

```text
Outside
   ↓
public method
   ↓
validation / controlled operation
   ↓
private state
```

Encapsulation means:

> Keep an object's internal state and implementation details controlled behind a public interface.

---

# 21. Complete Access Modifier Comparison

| Modifier | Same Class | Child Class | Outside |
|---|---:|---:|---:|
| `public` | ✅ | ✅ | ✅ |
| `protected` | ✅ | ✅ | ❌ |
| `private` | ✅ | ❌ | ❌ |
| `#private` | ✅ | ❌ | ❌ |

---

# 22. `const` vs `readonly`

These are easy to confuse.

### `const`

Applies to variables:

```ts
const chai = new Chai("Masala");
```

You cannot reassign:

```ts
chai = new Chai("Ginger"); // ❌
```

But properties can still be changed if they aren't readonly:

```ts
chai.flavor = "Ginger"; // ✅
```

### `readonly`

Applies to properties/types:

```ts
class Chai {
    readonly flavor: string;

    constructor(flavor: string) {
        this.flavor = flavor;
    }
}
```

Now:

```ts
chai.flavor = "Ginger"; // ❌
```

### Mental Model

```text
const
 ↓
variable cannot be reassigned

readonly
 ↓
property cannot be reassigned
```

---

# 23. OOP Mental Model

The concepts we've covered can be connected like this:

```text
                         OOP
                          │
          ┌───────────────┼────────────────┐
          │               │                │
       Classes        Encapsulation     Reuse
          │               │                │
          │          ┌────┴────┐       ┌───┴────┐
          │        private   getters  inheritance composition
          │        protected setters
          │
      constructor
          │
      properties
          │
       methods
          │
       static
          │
       abstract
```

---

# 24. Quick Cheat Sheet

### Class

```ts
class Chai {
    flavor: string;

    constructor(flavor: string) {
        this.flavor = flavor;
    }
}
```

### Public

```ts
public flavor: string;
```

Accessible everywhere.

### Private

```ts
private secret: string;
```

Accessible only inside the class.

### Protected

```ts
protected shopName: string;
```

Accessible inside the class and subclasses.

### Runtime private

```ts
#balance: number;
```

JavaScript private field.

### Readonly

```ts
readonly capacity: number;
```

Cannot be reassigned after initialization.

### Getter

```ts
get sugar() {
    return this._sugar;
}
```

### Setter

```ts
set sugar(value: number) {
    this._sugar = value;
}
```

### Static

```ts
static shopName = "Chai Shop";
```

Access through:

```ts
Chai.shopName;
```

### Abstract

```ts
abstract class Drink {
    abstract make(): void;
}
```

### Composition

```ts
class ChaiMaker {
    constructor(private heater: Heater) {}
}
```

---

# Final Mental Model

The most important thing is not memorizing the syntax.

Think about **ownership and access**:

```text
Class
 │
 ├── State
 │    ├── public
 │    ├── private
 │    ├── protected
 │    └── readonly
 │
 ├── Behavior
 │    └── methods
 │
 ├── Initialization
 │    └── constructor
 │
 ├── Class-level behavior/data
 │    └── static
 │
 ├── Contract for subclasses
 │    └── abstract
 │
 └── Dependencies
      └── composition
```

### The core ideas to remember

> **Class** → blueprint for objects  
> **Constructor** → initializes an object  
> **`this`** → current object instance  
> **`public`** → accessible everywhere  
> **`private`** → class only  
> **`protected`** → class + subclasses  
> **`readonly`** → cannot reassign  
> **getter/setter** → controlled access  
> **`static`** → belongs to the class, not an instance  
> **abstract class** → defines a base contract  
> **composition** → one object contains/uses another object

The next important OOP concepts to connect with these are **inheritance, method overriding, polymorphism, interfaces, and `implements`**.