# TypeScript — Types, Interfaces & Object Composition

## 📌 Overview

TypeScript gives us different ways to describe the **shape of data**.

In this topic, we learn:

* `type`
* `interface`
* `implements`
* Literal types
* Union types
* Intersection types
* Optional properties
* `readonly`
* When to use `type` vs `interface`

The main idea is:

> **We use TypeScript types to describe what an object should look like and what values it is allowed to contain.**

---

# 1. Object Types with `type`

We can use `type` to describe the structure of an object.

```ts
type ChaiOrder = {
    type: string;
    sugar: number;
    strong: boolean;
};
```

This means every `ChaiOrder` should have:

```text
type   → string
sugar  → number
strong → boolean
```

We can then reuse this type:

```ts
function makeChai(order: ChaiOrder) {
    console.log(order);
}

function serveChai(order: ChaiOrder) {
    console.log(order);
}
```

Now both functions expect the same structure.

For example:

```ts
makeChai({
    type: "masala",
    sugar: 2,
    strong: true
});
```

### Why is this useful?

Without a type:

```ts
function makeChai(order: any) {
    // ...
}
```

we lose type safety.

With:

```ts
function makeChai(order: ChaiOrder) {
    // ...
}
```

TypeScript knows exactly what `order` should contain.

---

# 2. `interface`

An `interface` is another way of describing the shape of an object.

```ts
interface TeaRecipe {
    water: number;
    milk: number;
}
```

We can use it with a class:

```ts
class MakeChai implements TeaRecipe {
    water = 100;
    milk = 50;
}
```

Here:

```text
TeaRecipe
    │
    ├── water: number
    └── milk: number
             │
             ▼
       MakeChai
       implements
       TeaRecipe
```

`implements` means:

> **"This class promises to satisfy this interface."**

So if the interface requires:

```ts
interface TeaRecipe {
    water: number;
    milk: number;
}
```

the class must provide those properties with compatible types.

---

# 3. What Does `implements` Actually Do?

Consider:

```ts
interface User {
    name: string;
    age: number;
}
```

Then:

```ts
class Admin implements User {
    name = "Dev";
    age = 19;
}
```

The class satisfies the interface.

But if we forget:

```ts
age
```

TypeScript will report an error.

So:

```text
interface
    ↓
Contract / Shape
    ↓
class implements interface
    ↓
Class must satisfy that shape
```

### Important

`implements` does **not** automatically create properties or methods.

It only checks that the class satisfies the interface.

---

# 4. Why Use `interface` with Classes?

You may wonder:

> "If `type` can describe objects, why use `interface`?"

Both can describe object shapes:

```ts
type User = {
    name: string;
    age: number;
};
```

and:

```ts
interface User {
    name: string;
    age: number;
}
```

Both are useful.

However, when you're defining a **contract that classes should implement**, interfaces are commonly preferred.

```ts
interface Payment {
    pay(): void;
}

class CreditCardPayment implements Payment {
    pay() {
        console.log("Paid using credit card");
    }
}
```

The interface describes the required behavior, and the class provides the implementation.

---

# 5. `type` Cannot Be Implemented When It Is a Union

Consider:

```ts
type CupSize = "small" | "medium" | "large";
```

This is a **union of literal types**.

It represents:

```text
CupSize
 ├── "small"
 ├── "medium"
 └── "large"
```

You cannot do:

```ts
class Chai implements CupSize {
    // ❌
}
```

Why?

Because `implements` expects an **object type with statically known members**, while this type represents a set of possible values.

`CupSize` is not describing an object.

It is describing:

> **One value must be either `"small"`, `"medium"`, or `"large"`.**

---

# 6. The Better Approach

If you want a class to implement a contract, describe an object:

```ts
interface CupSize {
    value: "small" | "medium" | "large";
}
```

Now:

```ts
class Chai implements CupSize {
    value: "small" | "medium" | "large" = "medium";
}
```

This works because `CupSize` describes an object:

```text
CupSize
   │
   └── value
        │
        ├── "small"
        ├── "medium"
        └── "large"
```

---

# 7. Union Types

A union means:

> **A value can be one of several possible types or values.**

Example:

```ts
type TeaType = "masala" | "green" | "black";
```

Now:

```ts
function orderChai(type: TeaType) {
    console.log(type);
}
```

Valid:

```ts
orderChai("masala");
orderChai("green");
orderChai("black");
```

Invalid:

```ts
orderChai("ginger"); // ❌
```

This is a **literal union**.

---

# 8. Literal Types

A literal type represents a **specific value**, rather than a general type.

For example:

```ts
let status: "success";
```

This variable can only contain:

```ts
"success"
```

When we combine literals:

```ts
type Status = "pending" | "success" | "error";
```

we create a controlled set of possible values.

```text
Status
  │
  ├── "pending"
  ├── "success"
  └── "error"
```

This is especially useful for things like:

* Status values
* User roles
* Modes
* Categories
* Configuration options
* API states

---

# 9. Intersection Types

A union means:

```text
A OR B
```

An intersection means:

```text
A AND B
```

We use `&` for intersections.

```ts
type BaseChai = {
    teaLeaves: number;
};

type Extra = {
    masala: number;
};

type MasalaChai = BaseChai & Extra;
```

Now `MasalaChai` must contain **both** sets of properties.

```ts
const cup: MasalaChai = {
    teaLeaves: 5,
    masala: 2
};
```

Think:

```text
BaseChai
    │
    └── teaLeaves

       +

Extra
    │
    └── masala

       ↓

MasalaChai
    ├── teaLeaves
    └── masala
```

---

# 10. Union vs Intersection

This distinction is extremely important.

### Union `|`

```ts
type A = string | number;
```

Means:

> **A can be a string OR a number.**

```text
A
├── string
└── number
```

### Intersection `&`

```ts
type User = BasicUser & AdminUser;
```

Means:

> **User must satisfy both types.**

```text
User
├── BasicUser properties
└── AdminUser properties
```

### Easy Mental Model

```text
|  → OR
&  → AND
```

---

# 11. Optional Properties

Sometimes a property doesn't have to exist.

Use `?`:

```ts
type UserName = {
    username: string;
    bio?: string;
};
```

Now both are valid:

```ts
const u1: UserName = {
    username: "Dev"
};
```

and:

```ts
const u2: UserName = {
    username: "Dev",
    bio: "I am a developer"
};
```

The `?` means:

```text
bio → optional
```

Conceptually:

```text
UserName
   │
   ├── username → required
   │
   └── bio      → optional
```

---

# 12. Optional Does Not Mean Always a String

This is an important detail.

When we write:

```ts
type UserName = {
    username: string;
    bio?: string;
};
```

the optional property is effectively treated as:

```ts
bio: string | undefined
```

depending on the compiler configuration and exact access context.

So when accessing:

```ts
u1.bio
```

we should consider that it might not exist.

This connects directly to the **type narrowing** topic.

For example:

```ts
if (u1.bio) {
    console.log(u1.bio.toUpperCase());
}
```

Here TypeScript can narrow `bio` to `string`.

---

# 13. `readonly`

`readonly` makes a property read-only after initialization.

Example:

```ts
type Config = {
    readonly appName: string;
    version: number;
};
```

Now:

```ts
const config: Config = {
    appName: "ChaiApp",
    version: 1.0
};
```

We can read:

```ts
console.log(config.appName);
```

But we cannot reassign:

```ts
config.appName = "ChaiCode"; // ❌
```

because:

```ts
readonly appName
```

cannot be changed after initialization.

---

# 14. `readonly` Does Not Mean Deeply Immutable

An important detail:

```ts
readonly
```

only applies to the property where it is declared.

It does not automatically make an entire object deeply immutable.

For example:

```ts
type User = {
    readonly name: string;
    preferences: {
        theme: string;
    };
};
```

This is not allowed:

```ts
user.name = "Another"; // ❌
```

But:

```ts
user.preferences.theme = "dark"; // ✅
```

can still be allowed because `preferences` itself wasn't marked readonly.

---

# 15. `type` vs `interface`

Both can describe object shapes.

### `type`

```ts
type User = {
    name: string;
    age: number;
};
```

### `interface`

```ts
interface User {
    name: string;
    age: number;
}
```

For basic object structures, either can work.

A useful rule while learning:

```text
type
 ↓
Flexible type composition
 ↓
unions
intersections
literal types
aliases

interface
 ↓
Object/class contracts
 ↓
implements
extending object structures
```

Don't think:

> "One is always better."

They overlap significantly.

---

# 16. A Real-World Example

Imagine an application that processes payments.

```ts
interface Payment {
    amount: number;
    currency: string;
}

class CreditCardPayment implements Payment {
    amount = 100;
    currency = "INR";

    pay() {
        console.log("Paid using credit card");
    }
}
```

Now imagine different payment capabilities:

```ts
type Refundable = {
    refund(): void;
};

type Trackable = {
    track(): void;
};
```

A payment that supports both can use an intersection:

```ts
type AdvancedPayment = Payment & Refundable & Trackable;
```

So:

```text
AdvancedPayment
       │
       ├── Payment
       │    ├── amount
       │    └── currency
       │
       ├── Refundable
       │    └── refund()
       │
       └── Trackable
            └── track()
```

This is where type composition becomes powerful.

---

# 🧠 Core Mental Model

Think about these concepts like building blocks:

```text
                  TypeScript Types
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
      Object          Union         Intersection
       Shape             |                &
        │               │                │
        │            A OR B           A AND B
        │
        ├── Optional ?
        │
        └── readonly
```

And interfaces:

```text
              Interface
                  │
                  ▼
              Contract
                  │
                  ▼
          class implements
                  │
                  ▼
       Class must satisfy it
```

---

# 🎯 What You Should Remember

Don't try to memorize every syntax. Focus on these ideas:

### 1. `type` describes a type

```ts
type User = {
    name: string;
};
```

### 2. `interface` describes an object contract

```ts
interface User {
    name: string;
}
```

### 3. `implements` makes a class satisfy an interface

```ts
class Admin implements User {
    name = "Dev";
}
```

### 4. `|` means OR

```ts
type Status = "pending" | "success";
```

### 5. `&` means AND

```ts
type AdminUser = User & Admin;
```

### 6. `?` means optional

```ts
bio?: string;
```

### 7. `readonly` prevents reassignment

```ts
readonly id: number;
```

---

# 🔥 Final Cheat Sheet

| Concept      | Meaning                      | Example                       |
| ------------ | ---------------------------- | ----------------------------- |
| `type`       | Creates a type alias         | `type User = {...}`           |
| `interface`  | Defines an object contract   | `interface User {...}`        |
| `implements` | Class satisfies an interface | `class Admin implements User` |
| `\|`         | OR / union                   | `string \| number`            |
| `&`          | AND / intersection           | `User & Admin`                |
| Literal type | Specific allowed value       | `"admin" \| "user"`           |
| `?`          | Optional property            | `bio?: string`                |
| `readonly`   | Cannot reassign property     | `readonly id: number`         |

### One-line mental model

> **`type` and `interface` describe shapes, unions describe alternatives, intersections combine requirements

[Check out the interface code](./src/6_Interface.ts)
