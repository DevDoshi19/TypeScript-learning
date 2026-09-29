# TypeScript — Object Types, Structural Typing & Utility Types

## 📌 Overview

This topic covers how TypeScript works with objects and how we can create reusable object types.

Main concepts:

* Object types
* Type aliases
* Structural typing
* Duck typing
* Breaking complex objects into reusable types
* `Partial`
* `Required`
* `Readonly`
* `Pick`
* `Omit`

The main idea is:

> **TypeScript cares about the structure of an object — what properties and types it has — rather than simply what the type is called.**

---

# 1. Object Types

We can directly describe the shape of an object:

```ts
let tea: {
    name: string;
    price: number;
    isHot: boolean;
};

tea = {
    name: "Green tea",
    price: 15,
    isHot: false
};
```

The type describes exactly what the object must contain:

```text
tea
 ├── name   → string
 ├── price  → number
 └── isHot  → boolean
```

This is useful for small objects.

---

# 2. Type Alias for Objects

If we need the same object structure multiple times, we can create a reusable type.

```ts
type Tea = {
    name: string;
    price: number;
    ingredients: string[];
};
```

Now we can reuse it:

```ts
const adrakChai: Tea = {
    name: "Adrak chai",
    price: 20,
    ingredients: ["ginger", "tea leaves"]
};
```

Instead of repeatedly writing:

```ts
{
    name: string;
    price: number;
    ingredients: string[];
}
```

we can simply write:

```ts
Tea
```

### Mental Model

```text
Object structure
      ↓
   type Tea
      ↓
Reusable everywhere
```

---

# 3. Structural Typing

One of the most important concepts in TypeScript is **structural typing**.

TypeScript generally doesn't care about the name of a type.

It cares about its **structure**.

For example:

```ts
type Cup = {
    size: string;
};
```

Now:

```ts
let smallCup: Cup = {
    size: "200ml"
};
```

We can also have:

```ts
let bigCup = {
    size: "500ml",
    material: "steel"
};
```

And this is valid:

```ts
smallCup = bigCup;
```

Why?

Because `bigCup` contains everything that `Cup` requires.

```text
Cup requires:

size
 │
 ▼
string
```

`bigCup` has:

```text
bigCup
 ├── size      → string ✅
 └── material  → string
```

The extra property doesn't prevent it from satisfying the minimum structure required by `Cup`.

---

# 4. Think "Minimum Requirements"

This is the easiest way to understand structural typing.

If a function requires:

```ts
type Cup = {
    size: string;
};
```

then it is basically saying:

> "Give me anything that has a `size` property containing a string."

It doesn't necessarily care if the object also has:

```text
material
color
brand
price
...
```

As long as the required structure exists.

```text
Required structure
       │
       ▼
   size: string
       ▲
       │
 ┌─────┴──────┐
 │            │
Cup        BigCup
             │
          + material
```

This is the core idea behind structural typing.

---

# 5. Duck Typing vs Structural Typing

You may hear the term **duck typing**:

> "If it looks like a duck and behaves like a duck, treat it like a duck."

TypeScript follows a similar idea through **structural typing**.

For example:

```ts
type Brew = {
    brewTime: number;
};

const coffee = {
    brewTime: 5,
    beans: "Arabica"
};

const chaiBrew: Brew = coffee;
```

This works because `coffee` has:

```ts
brewTime: number
```

which is what `Brew` requires.

The fact that the variable is called `coffee` doesn't matter.

```text
Brew requires
    │
    └── brewTime: number

coffee has
    │
    ├── brewTime: number ✅
    └── beans: string
```

Therefore:

```text
coffee satisfies Brew
```

### Important

TypeScript is primarily **structurally typed**.

"Duck typing" is a useful analogy for understanding this behavior.

---

# 6. Structural Typing vs Nominal Typing

Some languages use **nominal typing**, where the declared type/name matters.

Conceptually:

```text
Nominal typing:

Type A ≠ Type B

even if their structures look identical
```

TypeScript generally works differently:

```text
Structural typing:

Same required structure
        ↓
Compatible
```

For example:

```ts
type User = {
    name: string;
};

type Customer = {
    name: string;
};
```

Their names are different:

```text
User
Customer
```

but structurally they are compatible because both require:

```text
name: string
```

---

# 7. Breaking Complex Objects into Smaller Types

Large object types can become difficult to read.

Instead of:

```ts
type Order = {
    id: string;
    item: {
        name: string;
        quantity: number;
    }[];
    address: {
        street: string;
        pin: number;
    };
};
```

we can split them into reusable types:

```ts
type Item = {
    name: string;
    quantity: number;
};

type Address = {
    street: string;
    pin: number;
};

type Order = {
    id: string;
    item: Item[];
    address: Address;
};
```

Now the structure becomes easier to understand:

```text
Order
 │
 ├── id
 │
 ├── item[]
 │     └── Item
 │          ├── name
 │          └── quantity
 │
 └── address
       └── Address
            ├── street
            └── pin
```

### Why do this?

It gives us:

* Reusability
* Better readability
* Easier maintenance
* Smaller type definitions
* Better organization

> **Break large structures into smaller reusable types.**

---

# 8. Utility Types

TypeScript provides built-in **Utility Types** that allow us to create new types from existing types.

Instead of rewriting a type manually, we can transform it.

The most important ones here are:

```text
Partial
Required
Readonly
Pick
Omit
```

Think of them as **type transformers**.

```text
Existing Type
      │
      ▼
Utility Type
      │
      ▼
Modified Type
```

---

# 9. `Partial<Type>`

`Partial` makes **all properties optional**.

Start with:

```ts
type Chai = {
    name: string;
    price: number;
    isHot: boolean;
};
```

Normally:

```ts
const chai: Chai = {
    name: "Masala chai",
    price: 20,
    isHot: true
};
```

All properties are required.

But:

```ts
const updateChai = (updates: Partial<Chai>) => {
    console.log("Updating chai with", updates);
};
```

Now we can pass only the properties we want to update:

```ts
updateChai({
    price: 25
});
```

or:

```ts
updateChai({
    isHot: false
});
```

or even:

```ts
updateChai({});
```

Because:

```text
Partial<Chai>

name?     → optional
price?    → optional
isHot?    → optional
```

### Real-world use

`Partial` is especially useful for **update operations**.

For example:

```ts
updateUser({
    name: "Dev"
});
```

You don't need to send every user property just to change one field.

---

# 10. `Required<Type>`

`Required` does the opposite of `Partial`.

Suppose:

```ts
type ChaiOrder = {
    name?: string;
    quantity?: number;
};
```

Both properties are optional.

But we can create:

```ts
type CompleteChaiOrder = Required<ChaiOrder>;
```

Now:

```text
CompleteChaiOrder

name      → required
quantity  → required
```

Therefore:

```ts
const placeOrder = (order: Required<ChaiOrder>) => {
    console.log(order);
};
```

requires:

```ts
placeOrder({
    name: "Masala chai",
    quantity: 34
});
```

If we omit either property, TypeScript reports an error.

### Mental Model

```text
ChaiOrder
 ├── name? 
 └── quantity?

       │
       ▼
   Required<>
       │
       ▼

 ├── name
 └── quantity
```

---

# 11. `Readonly<Type>`

`Readonly` makes all properties readonly.

For example:

```ts
type Config = {
    appName: string;
    version: number;
};

type ReadonlyConfig = Readonly<Config>;
```

Now:

```ts
const config: ReadonlyConfig = {
    appName: "ChaiApp",
    version: 1.0
};
```

Reading is allowed:

```ts
console.log(config.appName);
```

But reassignment is not:

```ts
config.appName = "NewApp"; // ❌
```

Think:

```text
Config
   │
   ▼
Readonly<Config>
   │
   ├── readonly appName
   └── readonly version
```

---

# 12. `Pick<Type, Keys>`

`Pick` allows us to select only the properties we want from an existing type.

Suppose:

```ts
type Chai = {
    name: string;
    price: number;
    isHot: boolean;
    ingredients: string[];
};
```

But maybe a public menu only needs:

```text
name
price
```

We can write:

```ts
type BasicChaiInfo = Pick<Chai, "name" | "price">;
```

Now:

```text
BasicChaiInfo
 ├── name
 └── price
```

So:

```ts
const chaiInfo: BasicChaiInfo = {
    name: "Green tea",
    price: 15
};
```

Adding:

```ts
isHot: true
```

doesn't belong to the `BasicChaiInfo` type.

### Mental Model

```text
Chai
 ├── name
 ├── price
 ├── isHot
 └── ingredients

       │
       ▼
      Pick
    name + price
       │
       ▼

BasicChaiInfo
 ├── name
 └── price
```

---

# 13. `Omit<Type, Keys>`

`Omit` does the opposite of `Pick`.

Instead of selecting what we want, we specify what we **don't want**.

```ts
type Chai = {
    name: string;
    price: number;
    isHot: boolean;
    secretIngredients: string[];
};
```

Suppose we want to expose the chai information publicly but hide:

```text
secretIngredients
```

We can use:

```ts
type PublicChaiInfo = Omit<
    Chai,
    "secretIngredients"
>;
```

Now:

```text
PublicChaiInfo
 ├── name
 ├── price
 └── isHot
```

The secret property is removed from the resulting type.

---

# 14. `Pick` vs `Omit`

This is easy to remember:

```text
Pick → "Give me these properties."

Omit → "Give me everything except these properties."
```

Example:

```ts
Pick<User, "name" | "email">
```

means:

```text
Keep:
name
email
```

While:

```ts
Omit<User, "password">
```

means:

```text
Keep everything
except password
```

---

# 15. Utility Types Together

Suppose we have:

```ts
type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};
```

We can create different views without rewriting the entire type.

### Update User

```ts
type UpdateUser = Partial<User>;
```

Everything becomes optional.

### Public User

```ts
type PublicUser = Omit<User, "password">;
```

Password is removed.

### User Identity

```ts
type UserIdentity = Pick<User, "id" | "name">;
```

Only `id` and `name`.

### Immutable User

```ts
type ReadonlyUser = Readonly<User>;
```

Everything becomes readonly.

This is the real power of utility types:

> **Create variations of existing types without duplicating the original structure.**

---

# 🧠 Complete Mental Model

```text
                    OBJECT TYPE
                         │
                         ▼
                    type / interface
                         │
                         ▼
              ┌──────────┴──────────┐
              │                     │
       Structural Typing       Type Composition
              │                     │
              │              ┌──────┼──────┐
              │              │      │      │
              │              |      &    Utility
              │              │             Types
              │             Union
              │
              ▼
      "Does the structure fit?"
```

And utility types:

```text
                 Existing Type
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       Partial       Pick         Omit
          │            │            │
          ▼            ▼            ▼
       Optional      Select       Remove
```

---

# 🎯 What You Should Remember

You don't need to memorize every example. Understand these core ideas:

### 1. Object types describe structure

```ts
type Tea = {
    name: string;
    price: number;
};
```

### 2. TypeScript uses structural typing

```text
"If the required structure matches,
the types can be compatible."
```

### 3. Break complex types into smaller reusable types

```ts
type Item = {...};
type Address = {...};

type Order = {
    item: Item[];
    address: Address;
};
```

### 4. Utility types transform existing types

```text
Partial   → everything optional
Required  → everything required
Readonly  → everything readonly
Pick      → keep selected properties
Omit      → remove selected properties
```

---

# 🔥 Final Cheat Sheet

| Concept           | Meaning                          | Example                  |
| ----------------- | -------------------------------- | ------------------------ |
| Object Type       | Describes object structure       | `type User = {...}`      |
| Type Alias        | Reusable type definition         | `type Tea = {...}`       |
| Structural Typing | Compatibility based on structure | `bigCup → Cup`           |
| `Partial<T>`      | Makes properties optional        | `Partial<User>`          |
| `Required<T>`     | Makes properties required        | `Required<User>`         |
| `Readonly<T>`     | Makes properties readonly        | `Readonly<User>`         |
| `Pick<T, K>`      | Selects specific properties      | `Pick<User, "name">`     |
| `Omit<T, K>`      | Removes specific properties      | `Omit<User, "password">` |

### One-line mental model

> **TypeScript describes objects by their structure, and utility types let us easily create different versions of those structures without rewriting them.**

[Check out the interface code](./src/7_object_discussion.ts)