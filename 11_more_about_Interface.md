# TypeScript Interfaces — More About Interfaces

Interfaces are one of TypeScript's most important tools for describing the **shape and contract of objects, classes, and callable functions**.

If you have already seen Java, some concepts will feel very familiar:

```text
interface
implements
extends
methods
contracts
```

But TypeScript interfaces are primarily used by the **TypeScript type system** and disappear after compilation.

---

# 1. What Is an Interface?

An interface describes **what something should look like**.

It does not usually provide the implementation.

```ts
interface Chai {
    flavor: string;
    price: number;
    milk?: boolean;
}
```

This says:

> Any object claiming to be a `Chai` must have `flavor` and `price`, while `milk` is optional.

```ts
const masalaChai: Chai = {
    flavor: "Masala",
    price: 20
};
```

Invalid:

```ts
const chai: Chai = {
    flavor: "Masala"
};
```

Because `price` is required.

---

# 2. The Core Mental Model

Think of an interface as a **contract**.

```text
                INTERFACE
                    │
                    ▼
              "WHAT is required?"
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
        Object     Class    Function
          │         │         │
          ▼         ▼         ▼
      satisfies  implements  call signature
```

For example:

```ts
interface TeaMachine {
    start(): void;
    stop(): void;
}
```

The interface says:

```text
A TeaMachine MUST have:

start()
stop()
```

It doesn't care how those methods work.

---

# 3. Interfaces Can Define Methods

Yes!

An interface can define method signatures.

```ts
interface TeaMachine {
    start(): void;
    stop(): void;
}
```

But the interface doesn't provide the implementation.

```ts
const machine: TeaMachine = {
    start() {
        console.log("Machine started");
    },

    stop() {
        console.log("Machine stopped");
    }
};
```

The interface says:

```text
start() → must exist
stop()  → must exist
```

The object decides:

```text
HOW start() works
HOW stop() works
```

---

# 4. Interface + Class

This is where the Java-like feeling starts 😂.

A class can implement an interface.

```ts
interface TeaMachine {
    start(): void;
    stop(): void;
}

class ChaiMachine implements TeaMachine {

    start() {
        console.log("Heating water...");
    }

    stop() {
        console.log("Machine stopped");
    }
}
```

Now TypeScript checks:

```text
Does ChaiMachine satisfy TeaMachine?
        │
        ├── start()? ✅
        └── stop()?  ✅
```

If we forget:

```ts
class ChaiMachine implements TeaMachine {

    start() {
        console.log("Starting");
    }
}
```

TypeScript complains because `stop()` is missing.

---

# 5. `implements` Means "Follow This Contract"

```ts
class ChaiMachine implements TeaMachine
```

means:

> ChaiMachine promises to satisfy the TeaMachine interface.

Important:

```text
interface → defines the contract

class → provides the implementation
```

So:

```ts
interface TeaMachine {
    start(): void;
}
```

doesn't actually start anything.

The class does:

```ts
class ChaiMachine implements TeaMachine {

    start() {
        console.log("Starting...");
    }
}
```

---

# 6. Can an Interface Contain a Class?

No.

You cannot do:

```ts
interface TeaMachine {
    class Heater {} // ❌
}
```

An interface can describe:

- properties
- methods
- function signatures
- index signatures
- optional properties
- readonly properties

But it doesn't contain implementation like a class.

Think:

```text
Interface
    ↓
WHAT should exist?

Class
    ↓
HOW should it work?
```

---

# 7. Interface Can Describe Objects

The most common use:

```ts
interface User {
    name: string;
    age: number;
}

const user: User = {
    name: "Dev",
    age: 20
};
```

The interface describes the object's structure.

---

# 8. Optional Properties

Use `?` when a property isn't required.

```ts
interface Chai {
    flavor: string;
    price: number;
    milk?: boolean;
}
```

Both are valid:

```ts
const chai1: Chai = {
    flavor: "Masala",
    price: 20
};
```

```ts
const chai2: Chai = {
    flavor: "Masala",
    price: 20,
    milk: true
};
```

---

# 9. Readonly Properties

Interfaces can also define readonly properties.

```ts
interface User {
    readonly id: number;
    name: string;
}
```

```ts
const user: User = {
    id: 101,
    name: "Dev"
};

user.name = "Rahul"; // ✅
user.id = 200;       // ❌
```

`readonly` means the property cannot be reassigned through that type.

---

# 10. Function Interfaces — The Weird-Looking One 😂

You saw this:

```ts
interface DiscountCalculator {
    (price: number): number;
}
```

At first this looks weird.

But this is called a **call signature**.

It means:

> Anything that follows this interface must be callable like a function that accepts a number and returns a number.

Think:

```text
DiscountCalculator

INPUT
number

   ↓

FUNCTION

   ↓

OUTPUT
number
```

Therefore this is valid:

```ts
const apply50: DiscountCalculator = (p) => {
    return p * 0.5;
};
```

And yes — this part:

```ts
(p) => p * 0.5
```

is just a normal JavaScript arrow function.

The TypeScript part is:

```ts
: DiscountCalculator
```

which tells TypeScript:

> Check that this function follows the DiscountCalculator contract.

---

# 11. Function Interface vs Normal Function Type

The interface:

```ts
interface DiscountCalculator {
    (price: number): number;
}
```

is roughly equivalent to:

```ts
type DiscountCalculator = (price: number) => number;
```

Then:

```ts
const apply50: DiscountCalculator = (price) => price * 0.5;
```

Both work.

For simple function types, many developers prefer the `type` syntax because it's shorter.

---

# 12. Why Would We Use a Function Interface?

Interfaces become interesting when a callable function also has properties.

For example:

```ts
interface DiscountCalculator {
    (price: number): number;
    description: string;
}
```

Now the thing must be:

```text
CALLABLE
   +
PROPERTY
```

Example:

```ts
const discount: DiscountCalculator = Object.assign(
    (price: number) => price * 0.5,
    {
        description: "50% discount"
    }
);

console.log(discount(100));
console.log(discount.description);
```

So an interface can describe more than just normal objects.

---

# 13. Index Signatures

You may have seen:

```ts
interface ChaiRatings {
    [flavor: string]: number;
}
```

This means:

> You can use arbitrary string keys, but every value must be a number.

```ts
const ratings: ChaiRatings = {
    masala: 4.5,
    ginger: 4.0,
    cardamom: 5.0
};
```

Here:

```ts
masala
ginger
cardamom
```

are dynamic keys.

And:

```ts
4.5
4.0
5.0
```

must be numbers.

---

# 14. What Does `[flavor: string]` Actually Mean?

This:

```ts
[flavor: string]: number;
```

does NOT mean there must be a property called `flavor`.

`flavor` is simply the name given to the key variable.

You could write:

```ts
[key: string]: number;
```

or:

```ts
[name: string]: number;
```

or:

```ts
[anything: string]: number;
```

They mean the same thing.

The important part is:

```ts
[string]: number
```

Meaning:

```text
string key → number value
```

---

# 15. Combining Fixed Properties + Dynamic Properties

You can have both.

```ts
interface ChaiRatings {
    name: string;

    scores: {
        [flavor: string]: number;
    };
}
```

Now:

```ts
const ratings: ChaiRatings = {
    name: "Chai Ratings",

    scores: {
        masala: 4.5,
        ginger: 4.0,
        cardamom: 5.0
    }
};
```

This is useful when you have:

```text
known structure
      +
dynamic data
```

For example:

```text
API Response
│
├── name
├── timestamp
└── scores
      ├── masala
      ├── ginger
      └── cardamom
```

---

# 16. Interface Extension

Interfaces can extend other interfaces.

```ts
interface A {
    a: string;
}

interface B {
    b: string;
}

interface C extends A, B {
    c: string;
}
```

Now `C` contains:

```text
a
b
c
```

Therefore:

```ts
const obj: C = {
    a: "A",
    b: "B",
    c: "C"
};
```

Think:

```text
A
│
└── a

B
│
└── b

     ↓ extends

C
├── a
├── b
└── c
```

---

# 17. Multiple Interface Inheritance

TypeScript allows:

```ts
interface A {
    a: string;
}

interface B {
    b: string;
}

interface C extends A, B {
    c: string;
}
```

This is useful for composing contracts.

For example:

```ts
interface Timestamped {
    createdAt: Date;
}

interface Identifiable {
    id: number;
}

interface User extends Timestamped, Identifiable {
    name: string;
}
```

Now:

```ts
const user: User = {
    id: 101,
    name: "Dev",
    createdAt: new Date()
};
```

---

# 18. Declaration Merging — One Special Feature of Interfaces

This is an interesting TypeScript feature.

You can declare the same interface multiple times.

```ts
interface User {
    name: string;
}

interface User {
    age: number;
}
```

TypeScript merges them.

So this:

```ts
interface User {
    name: string;
    age: number;
}
```

is effectively created.

Therefore:

```ts
const user: User = {
    name: "Dev",
    age: 20
};
```

works.

This is called:

## Declaration Merging

---

# 19. Why Does Declaration Merging Matter?

This becomes particularly useful when working with libraries.

Imagine a library provides:

```ts
interface Request {
    user: string;
}
```

You can extend the interface elsewhere:

```ts
interface Request {
    token: string;
}
```

Now TypeScript understands:

```ts
Request
├── user
└── token
```

This is one reason interfaces are heavily used in TypeScript libraries and frameworks.

---

# 20. Interface vs Type

This is probably the most important question.

Both can describe objects.

```ts
interface User {
    name: string;
    age: number;
}
```

and:

```ts
type User = {
    name: string;
    age: number;
};
```

Both work.

So which one should you use?

There isn't a universal "interface is better" rule.

---

# 21. What `type` Is Good At

`type` is extremely flexible.

It can represent:

### Object

```ts
type User = {
    name: string;
};
```

### Union

```ts
type Status = "loading" | "success" | "error";
```

### Tuple

```ts
type Point = [number, number];
```

### Function

```ts
type Calculator = (a: number, b: number) => number;
```

### Intersection

```ts
type Admin = User & {
    permissions: string[];
};
```

So:

```text
type
├── objects
├── unions
├── intersections
├── tuples
├── functions
├── literal types
└── more
```

---

# 22. What `interface` Is Particularly Good At

Interfaces shine when you're describing a **contract that can be extended or implemented**.

```ts
interface User {
    name: string;
    age: number;
}
```

Then:

```ts
interface Admin extends User {
    permissions: string[];
}
```

Or:

```ts
class AdminUser implements User {
    name = "Dev";
    age = 20;
}
```

So a common mental model is:

```text
interface
    ↓
contract / structure

class
    ↓
implementation
```

---

# 23. Interface vs Type — Practical Rule

A useful rule of thumb:

### Use `interface` when:

```text
You are modelling an object/class contract
```

Example:

```ts
interface User {
    name: string;
    age: number;
}
```

### Use `type` when:

```text
You need unions, tuples, intersections,
literal types, or function types
```

Example:

```ts
type Status = "loading" | "success" | "error";
```

But remember:

> This is a convention, not a law.

There is a lot of overlap.

---

# 24. `extends` vs `implements`

These two are easy to confuse.

## `extends`

Used to build one interface from another:

```ts
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}
```

Think:

```text
Dog IS an extended Animal contract
```

---

## `implements`

Used by a class to satisfy an interface:

```ts
interface Animal {
    name: string;
}

class Dog implements Animal {
    name = "Bruno";
}
```

Think:

```text
interface → contract
class     → implementation
```

---

# 25. `extends` Can Also Be Used with Classes

You already know this from OOP:

```ts
class Animal {
    move() {}
}

class Dog extends Animal {
    bark() {}
}
```

Here:

```text
Dog inherits from Animal
```

But:

```ts
class Dog implements Animal
```

would mean something different, and only works when the `Animal` type can be used as a contract.

The mental distinction is:

```text
extends
    ↓
inherit / build upon

implements
    ↓
satisfy a contract
```

---

# 26. Structural Typing

This is one of the biggest differences from Java-style thinking.

TypeScript mostly uses **structural typing**.

Example:

```ts
interface User {
    name: string;
}
```

This object works:

```ts
const person = {
    name: "Dev",
    age: 20
};

const user: User = person;
```

Why?

Because `person` has everything that `User` requires.

```text
User requires:
    name

person has:
    name ✅
    age  ✅
```

Extra properties don't matter when assigning an existing variable like this.

The important thing is the **shape**.

---

# 27. "Shape Over Name"

TypeScript generally asks:

```text
Does it have the required structure?
```

rather than:

```text
Was it explicitly declared as this interface?
```

For example:

```ts
interface Chai {
    flavor: string;
    price: number;
}
```

This works:

```ts
const drink = {
    flavor: "Masala",
    price: 20
};

const chai: Chai = drink;
```

Even though `drink` wasn't declared as:

```ts
const drink: Chai
```

This is structural typing.

---

# 28. Interfaces Disappear at Runtime

This is VERY important.

```ts
interface User {
    name: string;
    age: number;
}
```

TypeScript uses this while checking your code.

After compilation, the interface itself does not become JavaScript code.

Conceptually:

```text
TypeScript
    │
    ├── interface User
    │
    ▼
Type checking
    │
    ▼
JavaScript
```

The interface isn't a runtime object.

You cannot do:

```ts
new User(); // ❌
```

because `User` is not a JavaScript class.

---

# 29. Interface vs Class

Don't confuse these.

### Interface

```ts
interface User {
    name: string;
    age: number;
}
```

Describes a contract.

### Class

```ts
class User {
    constructor(
        public name: string,
        public age: number
    ) {}
}
```

Creates runtime objects.

```ts
const user = new User("Dev", 20);
```

So:

```text
interface
    ↓
type-level contract

class
    ↓
runtime object + behavior
```

---

# 30. Interface + Class Together

This is a very common pattern in backend development.

```ts
interface PaymentService {
    pay(amount: number): void;
}
```

Implementation:

```ts
class StripePaymentService implements PaymentService {

    pay(amount: number) {
        console.log(`Paid ₹${amount}`);
    }
}
```

Another implementation:

```ts
class RazorpayPaymentService implements PaymentService {

    pay(amount: number) {
        console.log(`Paid ₹${amount}`);
    }
}
```

Now your application can depend on the contract:

```ts
function checkout(
    paymentService: PaymentService
) {
    paymentService.pay(500);
}
```

You can provide either implementation:

```ts
checkout(new StripePaymentService());
```

or:

```ts
checkout(new RazorpayPaymentService());
```

This is one of the reasons interfaces are important in **backend architecture and system design**.

---

# 31. Interface as an Abstraction

Think about a payment system.

Your application doesn't really care:

```text
How does Stripe work?
How does Razorpay work?
How does PayPal work?
```

It only cares:

```text
Can you perform pay(amount)?
```

So:

```ts
interface PaymentService {
    pay(amount: number): void;
}
```

becomes the abstraction.

```text
                PaymentService
                     │
            ┌────────┼────────┐
            ▼        ▼        ▼
         Stripe   Razorpay   PayPal
```

All implementations follow the same contract.

---

# 32. Interface Can Describe Functions Too

Remember:

```ts
interface DiscountCalculator {
    (price: number): number;
}
```

This means:

```text
DiscountCalculator
        ↓
callable
        ↓
number → number
```

So:

```ts
const apply50: DiscountCalculator =
    (price) => price * 0.5;
```

is completely normal JavaScript with a TypeScript contract.

---

# 33. Interface Can Have Properties + Methods

```ts
interface ChaiShop {
    name: string;
    location: string;

    open(): void;
    close(): void;
}
```

Implementation:

```ts
class LocalChaiShop implements ChaiShop {

    name = "Chai Code Cafe";
    location = "Ahmedabad";

    open() {
        console.log("Shop opened");
    }

    close() {
        console.log("Shop closed");
    }
}
```

The interface describes the complete public contract.

---

# 34. Interface Mental Model

Keep this in your head:

```text
                    INTERFACE
                        │
                "WHAT should exist?"
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
      Object           Class          Function
        │               │               │
        ▼               ▼               ▼
    satisfies       implements      call signature
```

And:

```text
interface = WHAT
class     = HOW
```

Not always literally, but this is an excellent mental model.

---

# 35. Quick Comparison

| Feature             | `interface`      | `type`                                   |
| ------------------- | ---------------- | ---------------------------------------- |
| Object shape        | ✅                | ✅                                        |
| Methods             | ✅                | ✅                                        |
| Optional properties | ✅                | ✅                                        |
| Readonly            | ✅                | ✅                                        |
| Union               | ❌                | ✅                                        |
| Tuple               | ❌                | ✅                                        |
| Literal types       | ❌                | ✅                                        |
| Function type       | ✅ Call Signature | ✅                                        |
| `extends`           | ✅                | Via intersections                        |
| `implements`        | ✅                | Can also work with suitable object types |
| Declaration merging | ✅                | ❌                                        |
| Runtime JavaScript  | ❌                | ❌                                        |

---

# 36. The Big Picture

You can think about TypeScript's major building blocks like this:

```text
TYPE SYSTEM
│
├── type
│   ├── unions
│   ├── intersections
│   ├── tuples
│   ├── literal types
│   └── object types
│
├── interface
│   ├── object contracts
│   ├── method contracts
│   ├── class contracts
│   ├── function call signatures
│   ├── extends
│   └── declaration merging
│
├── class
│   ├── state
│   ├── behavior
│   ├── inheritance
│   └── runtime objects
│
└── function
    ├── parameters
    ├── return values
    └── callable contracts
```

---

# 37. Final Mental Model

Don't memorize dozens of rules.

Remember these:

```text
INTERFACE
    ↓
A CONTRACT / SHAPE
```

```text
implements
    ↓
"This class follows this contract"
```

```text
extends
    ↓
"Build a bigger contract from another contract"
```

```ts
interface DiscountCalculator {
    (price: number): number;
}
```

means:

```text
"This thing must be callable
with a number
and return a number."
```

And:

```ts
interface ChaiRatings {
    [flavor: string]: number;
}
```

means:

```text
"Any string key is allowed,
but its value must be a number."
```

Finally:

```text
interface
    ↓
WHAT

class
    ↓
HOW

object
    ↓
actual data

function
    ↓
actual behavior
```

That's the core of TypeScript interfaces. 🚀
