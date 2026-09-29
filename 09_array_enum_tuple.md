# Arrays, Tuples & Enums in TypeScript

This README covers how TypeScript handles:

- Arrays
- Typed arrays
- Arrays with custom types
- Readonly arrays
- Multidimensional arrays
- Tuples
- Optional and named tuples
- Readonly tuples
- Enums
- Numeric, string, and heterogeneous enums
- `const enum`

---

# 1. Arrays in TypeScript

In TypeScript, we can specify what type of values an array is allowed to contain.

### Syntax

```ts
let variableName: type[] = [];
```

### Example

```ts
const chaiFlavours: string[] = ["Masala", "Adhrak", "Ginger"];

const price: number[] = [10, 20, 15];
```

Here:

```ts
string[]
```

means:

> This array can contain only strings.

And:

```ts
number[]
```

means:

> This array can contain only numbers.

So this would be invalid:

```ts
const price: number[] = [10, 20, "15"];
// Error
```

---

# 2. Array<T> Syntax

There is another way to define an array:

```ts
const rating: Array<number> = [4.5, 5.0, 3.2];
```

This is equivalent to:

```ts
const rating: number[] = [4.5, 5.0, 3.2];
```

Both are valid.

### Two common styles

```ts
const ratings: number[] = [4.5, 5.0, 3.2];

const prices: Array<number> = [10, 20, 15];
```

### Mental Model

```text
number[]
    ↓
Array of numbers

Array<number>
    ↓
Array containing numbers
```

They represent the same thing.

---

# 3. Arrays with Custom Types

Arrays don't have to contain only primitive types.

We can create our own type and use it inside an array.

```ts
type Size = "small" | "medium" | "large";

const cupSize: Array<Size> = ["large", "medium"];
```

Now only these values are allowed:

```ts
"small"
"medium"
"large"
```

So:

```ts
const cupSize: Array<Size> = [
    "large",
    "medium",
    "abc"
];
```

will give an error because:

```ts
"abc"
```

is not part of the `Size` type.

### This is useful when:

You want an array to contain only a specific set of allowed values.

For example:

```ts
type Role = "admin" | "user" | "manager";

const roles: Role[] = ["admin", "user"];
```

---

# 4. Array of Objects

We can also create an array containing objects with a specific structure.

```ts
type Chai = {
    name: string;
    price: number;
};

const menu: Chai[] = [
    { name: "Masala", price: 10 },
    { name: "Adhrak", price: 20 },
    { name: "Ginger", price: 15 }
];
```

Every object inside `menu` must follow the `Chai` structure.

This is invalid:

```ts
const menu: Chai[] = [
    { name: "Masala", price: 10 },
    { name: "Green", price: "15" }
];
```

because `price` must be a number.

---

# 5. Readonly Arrays

Sometimes we want an array that cannot be modified after initialization.

We can use:

```ts
readonly
```

Example:

```ts
const cities: readonly string[] = [
    "Delhi",
    "Mumbai",
    "Kolkata"
];
```

Now we cannot modify the array:

```ts
cities.push("Chennai");
// Error
```

Other mutating operations are also blocked:

```ts
cities.pop();
cities.shift();
cities.unshift("Ahmedabad");
cities[0] = "Pune";
```

### Important

`readonly` does **not** mean the values magically become immutable everywhere.

It means:

> Through this readonly reference, TypeScript does not allow us to modify the array.

### Mental Model

```text
Normal Array
     ↓
Read + Modify

Readonly Array
     ↓
Read only
     ↓
No push / pop / reassignment
```

Readonly arrays are useful when a function should receive data but should not modify it.

---

# 6. Multidimensional Arrays

An array can contain other arrays.

For example:

```ts
const table: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
```

Think of it as:

```text
number[][]
   │
   └── Array of
         │
         └── Arrays of numbers
```

So:

```ts
number[]
```

means:

```text
[1, 2, 3]
```

while:

```ts
number[][]
```

means:

```text
[
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
```

This is commonly used for:

- Matrices
- Grids
- Tables
- Game boards
- Graph representations

---

# 7. Tuples

A tuple is different from a normal array.

A tuple allows us to define:

> The exact number of elements and the type of each position.

Example:

```ts
let chaiTuple: [string, number];

chaiTuple = ["Masala", 10];
```

This means:

```text
Position 0 → string
Position 1 → number
```

So:

```ts
chaiTuple = [10, "Masala"];
```

is invalid.

The order matters.

### Array vs Tuple

```ts
const data: (string | number)[] = ["Masala", 10];
```

This means:

> Any number of strings or numbers can exist in the array.

But:

```ts
const data: [string, number] = ["Masala", 10];
```

means:

> Exactly two elements. First must be string, second must be number.

### Mental Model

```text
Array
─────
Flexible length
Flexible positions

[string, number, string, number, ...]


Tuple
─────
Known structure
Fixed positions

[string, number]
     ↓      ↓
   name   price
```

---

# 8. Important: Tuple `.push()` Behavior

A tuple is not completely immutable.

For example:

```ts
let chaiTuple: [string, number] = ["Masala", 10];

chaiTuple.push("Adhrak");
```

TypeScript can allow this.

This often surprises beginners.

A tuple primarily provides **positional type checking**. It does not automatically make the tuple immutable.

So:

```ts
chaiTuple[0] = "Ginger";
```

is allowed because the first position is still a string.

And:

```ts
chaiTuple[1] = 20;
```

is allowed because the second position is still a number.

If you want the tuple itself to be readonly:

```ts
const chaiTuple: readonly [string, number] = ["Masala", 10];
```

Now mutation is prevented.

---

# 9. Optional Tuple Elements

Tuple elements can also be optional.

```ts
let userInfo: [string, number, boolean?];

userInfo = ["Dev", 21, true];

userInfo = ["Jadi", 21];
```

Both are valid.

The structure is:

```text
[string, number, boolean?]
   ↓       ↓       ↓
 required required optional
```

The third value may exist or may be absent.

But this would be invalid:

```ts
userInfo = ["Dev"];
```

because the first two elements are required.

---

# 10. Readonly Tuples

Tuples can also be readonly.

```ts
const location: readonly [number, number] = [
    28.7041,
    77.1025
];
```

This is useful for things like coordinates.

The tuple structure is:

```text
[number, number]
     ↓      ↓
 latitude longitude
```

Because it is readonly, we cannot modify it:

```ts
location[0] = 20;
// Error

location.push(30);
// Error
```

---

# 11. Named Tuples

We can give names to tuple elements to make their purpose clearer.

```ts
const chaiItems: [name: string, price: number] = [
    "Masala",
    10
];
```

The names:

```ts
name
price
```

are mainly for readability and developer tooling.

They help us understand what each position represents.

Instead of:

```ts
[string, number]
```

we can think:

```text
[name: string, price: number]
```

### Important

Named tuples are still tuples.

The positions still matter.

```ts
[name: string, price: number]
```

does not become an object like:

```ts
{
    name: string;
    price: number;
}
```

A tuple is still accessed by index:

```ts
chaiItems[0]; // name
chaiItems[1]; // price
```

---

# 12. Enums

An `enum` allows us to define a set of named constants.

Example:

```ts
enum ChaiSize {
    SMALL,
    MEDIUM,
    LARGE
}
```

Now:

```ts
const size = ChaiSize.SMALL;
```

By default, numeric enums start from `0`.

So:

```text
SMALL  → 0
MEDIUM → 1
LARGE  → 2
```

Therefore:

```ts
ChaiSize.SMALL
```

has the value:

```ts
0
```

---

# 13. Numeric Enums

We can also explicitly specify the starting value.

```ts
enum Status {
    PENDING = 100,
    SERVED,
    CANCELLED
}
```

TypeScript automatically increments the following values.

So:

```text
PENDING   → 100
SERVED    → 101
CANCELLED → 102
```

We don't need to write every value manually.

---

# 14. String Enums

Enums can also contain strings.

```ts
enum ChaiType {
    MASALA = "masala",
    GINGER = "ginger",
    GREEN = "green"
}
```

Now:

```ts
ChaiType.MASALA
```

returns:

```text
"masala"
```

This is particularly useful when working with:

- API values
- Database values
- Status values
- User roles
- Application states

### Example

```ts
function makeChai(type: ChaiType, cups: number) {
    console.log(`Making ${cups} cups of ${type} chai`);
}

makeChai(ChaiType.MASALA, 2);
makeChai(ChaiType.GINGER, 3);
makeChai(ChaiType.GREEN, 1);
```

This gives the function a restricted set of valid values.

---

# 15. Why Use Enums?

Without an enum:

```ts
function makeChai(type: string) {
    // ...
}

makeChai("masala");
makeChai("Masala");
makeChai("masla");
makeChai("random");
```

The compiler cannot prevent arbitrary strings.

With an enum:

```ts
enum ChaiType {
    MASALA = "masala",
    GINGER = "ginger",
    GREEN = "green"
}

function makeChai(type: ChaiType) {
    // ...
}
```

Now the function expects one of the defined enum values.

```ts
makeChai(ChaiType.MASALA);
```

This gives us a controlled set of values.

---

# 16. Heterogeneous Enums

A heterogeneous enum contains different types of values.

```ts
enum ChaiStatus {
    PENDING = "pending",
    SERVED = 1,
    CANCELLED = "cancelled"
}
```

Here we have:

```text
PENDING   → string
SERVED    → number
CANCELLED → string
```

TypeScript allows this, but it is generally **not recommended**.

Why?

Because mixing types makes the enum harder to understand and reason about.

Prefer a consistent enum:

```ts
enum ChaiStatus {
    PENDING = "pending",
    SERVED = "served",
    CANCELLED = "cancelled"
}
```

or:

```ts
enum ChaiStatus {
    PENDING = 0,
    SERVED = 1,
    CANCELLED = 2
}
```

Keep the representation consistent when possible.

---

# 17. `const enum`

We can declare an enum using:

```ts
const enum Sugar {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3
}
```

The important idea is that `const enum` is designed to allow enum values to be **inlined** by the TypeScript compiler in emitted JavaScript.

Example:

```ts
const sugarLevel = Sugar.MEDIUM;
```

The compiler can replace the enum reference with its value during compilation.

### Important Correction

`const enum` does **not** mean:

> "We cannot change the value after initialization."

That is not the main purpose of `const enum`.

Instead:

```text
enum
 ↓
runtime enum object

const enum
 ↓
values can be inlined during compilation
```

`const enum` is therefore mainly a **compile-time optimization/design choice**.

---

# 18. Array vs Tuple vs Enum

| Feature | Array | Tuple | Enum |
|---|---|---|---|
| Purpose | Collection of values | Fixed structure | Named constants |
| Length | Usually flexible | Fixed/known | Not applicable |
| Position types | Usually same type | Can differ | Named members |
| Example | `string[]` | `[string, number]` | `ChaiType` |
| Access | Index | Index | Member name |
| Example | `["Masala", "Ginger"]` | `["Masala", 10]` | `ChaiType.MASALA` |

---

# 19. Important Mental Models

### Arrays

```text
"I have many values of the same type."

string[]
number[]
Chai[]
```

---

### Tuples

```text
"I have a small fixed structure where
each position has a specific meaning."

[string, number]
     ↓       ↓
    name    price
```

---

### Readonly Array

```text
"I want to read this collection,
but I don't want it modified through this reference."

readonly string[]
```

---

### Enum

```text
"I have a predefined set of named constants."

ChaiType.MASALA
ChaiType.GINGER
ChaiType.GREEN
```

---

# 20. Quick Cheat Sheet

```ts
// Array
const prices: number[] = [10, 20, 30];

// Generic Array
const ratings: Array<number> = [4.5, 5, 3.2];

// Custom type array
type Size = "small" | "medium" | "large";

const sizes: Size[] = ["small", "large"];

// Array of objects
type Chai = {
    name: string;
    price: number;
};

const menu: Chai[] = [
    { name: "Masala", price: 10 }
];

// Readonly array
const cities: readonly string[] = [
    "Delhi",
    "Mumbai"
];

// Multidimensional array
const matrix: number[][] = [
    [1, 2],
    [3, 4]
];

// Tuple
let chai: [string, number] = [
    "Masala",
    10
];

// Optional tuple element
let user: [string, number, boolean?] = [
    "Dev",
    21
];

// Readonly tuple
const location: readonly [number, number] = [
    28.7041,
    77.1025
];

// Named tuple
const item: [name: string, price: number] = [
    "Masala",
    10
];

// Enum
enum ChaiType {
    MASALA = "masala",
    GINGER = "ginger",
    GREEN = "green"
}

const type = ChaiType.MASALA;
```

---

# Final Mental Model

```text
                    COLLECTIONS & FIXED DATA
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
        Array               Tuple              Enum
          │                   │                   │
     Many values         Fixed structure     Named constants
     usually same        position matters    predefined values
        type
          │                   │                   │
      string[]          [string, number]    ChaiType.MASALA
      number[]           [name, price]      ChaiType.GREEN
      Chai[]             [lat, long]
```

### The main idea to remember:

> **Array = collection**  
> **Tuple = fixed structure**  
> **Readonly = don't modify through this reference**  
> **Enum = named set of constants**

These four concepts are the foundation for working with structured collections and fixed data in TypeScript.

[Check out the interface code](./src/9_array_enum_tuples.ts)
