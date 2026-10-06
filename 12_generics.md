# TypeScript Generics — Reusable & Type-Safe Code

## 📌 Overview

**Generics** allow us to write reusable code without losing type safety.

Instead of writing separate functions for:

```text
string
number
object
boolean
...
```

we can write **one generic function** that works with all of them while still remembering the exact type.

The core idea is:

```text
Generic = Type as a parameter
```

Just like a function accepts a value as a parameter:

```ts
function add(a: number, b: number) {}
```

a generic function can accept a **type** as a parameter:

```ts
function wrapArray<T>(item: T): T[] {}
```

---

# 1. Why Do We Need Generics?

Suppose we want a function that puts a value inside an array.

Without generics, we might write:

```ts
function wrapString(item: string): string[] {
    return [item];
}
```

For numbers:

```ts
function wrapNumber(item: number): number[] {
    return [item];
}
```

For objects:

```ts
function wrapObject(item: object): object[] {
    return [item];
}
```

This creates unnecessary duplication.

Instead, we can write:

```ts
function wrapArray<T>(item: T): T[] {
    return [item];
}
```

Now one function works for everything.

---

# 2. What Is `<T>`?

This:

```ts
<T>
```

is a **generic type parameter**.

`T` is just a convention.

It usually means:

```text
T → Type
```

You could technically write:

```ts
function wrapArray<Type>(item: Type): Type[] {
    return [item];
}
```

or:

```ts
function wrapArray<Data>(item: Data): Data[] {
    return [item];
}
```

But:

```ts
<T>
```

is the most common convention.

---

# 3. The Most Important Generic Example

```ts
function wrapArray<T>(item: T): T[] {
    return [item];
}
```

Look carefully at the `T`:

```text
function wrapArray<T>(item: T): T[]
                    │          │
                    │          └── return uses same T
                    │
                    └── parameter uses T
```

Whatever type `T` becomes, it stays consistent.

---

# 4. Calling the Generic Function

```ts
wrapArray("masala");
```

TypeScript infers:

```text
T = string
```

So conceptually:

```ts
function wrapArray<string>(item: string): string[]
```

Therefore:

```ts
wrapArray("masala");
```

has type:

```ts
string[]
```

---

For:

```ts
wrapArray(42);
```

TypeScript infers:

```text
T = number
```

So the result is:

```ts
number[]
```

---

For:

```ts
wrapArray({
    flavor: "masala",
    rating: 4.5
});
```

TypeScript infers:

```text
T = {
    flavor: string;
    rating: number;
}
```

Therefore the result becomes:

```ts
{
    flavor: string;
    rating: number;
}[]
```

---

# 5. Generic Type Inference

You usually **don't have to manually specify `T`**.

TypeScript can infer it.

```ts
const result = wrapArray("masala");
```

TypeScript understands:

```text
"masala"
    ↓
string
    ↓
T = string
    ↓
T[]
    ↓
string[]
```

This is called **generic type inference**.

---

# 6. You Can Explicitly Provide the Type

You can also tell TypeScript what `T` should be.

```ts
const result = wrapArray<string>("masala");
```

Here:

```text
T = string
```

Therefore:

```ts
result → string[]
```

For numbers:

```ts
const numbers = wrapArray<number>(42);
```

Result:

```text
number[]
```

Usually TypeScript can infer this automatically, so explicit generic arguments are often unnecessary.

---

# 7. Generics Preserve Information

This is one of the biggest advantages.

Consider:

```ts
function wrapArray<T>(item: T): T[] {
    return [item];
}
```

If we pass:

```ts
wrapArray({
    flavor: "masala",
    rating: 4.5
});
```

TypeScript doesn't just remember:

```ts
object[]
```

It remembers the actual structure:

```ts
{
    flavor: string;
    rating: number;
}[]
```

So:

```ts
const result = wrapArray({
    flavor: "masala",
    rating: 4.5
});

result[0].flavor;
result[0].rating;
```

are both type-safe.

---

# 8. Generic Functions with Multiple Types

Generics don't have to use only `T`.

You can have:

```ts
function pair<A, B>(first: A, second: B): [A, B] {
    return [first, second];
}
```

Now we have:

```text
A → type of first
B → type of second
```

---

## Example

```ts
pair("masala", 4.5);
```

TypeScript infers:

```text
A = string
B = number
```

Therefore:

```ts
[string, number]
```

---

Another example:

```ts
pair(42, {
    flavor: "masala",
    rating: 4.5
});
```

Now:

```text
A = number

B = {
    flavor: string;
    rating: number;
}
```

Result:

```ts
[number, {
    flavor: string;
    rating: number;
}]
```

---

# 9. What About `pair(12, 12)`?

```ts
pair(12, 12);
```

TypeScript can infer:

```text
A = number
B = number
```

So:

```ts
[number, number]
```

The two generic parameters don't have to be different.

They simply represent **potentially different types**.

---

# 10. Generic Interfaces

Generics aren't limited to functions.

You can also make interfaces generic.

```ts
interface Box<T> {
    content: T;
}
```

Here:

```text
T = type of content
```

---

# 11. Using a Generic Interface

```ts
const numberBox: Box<number> = {
    content: 42
};
```

Here:

```text
T = number
```

So conceptually:

```ts
interface Box<number> {
    content: number;
}
```

Therefore:

```ts
content: 42
```

is valid.

---

For strings:

```ts
const stringBox: Box<string> = {
    content: "square"
};
```

Now:

```text
T = string
```

So:

```text
Box<string>
    ↓
content: string
```

---

# 12. Generics Give Us Type Safety

This is invalid:

```ts
const numberBox: Box<number> = {
    content: "42"
};
```

Why?

Because:

```text
Box<number>
     │
     ▼
T = number
     │
     ▼
content must be number
```

But:

```ts
"42"
```

is a string.

Therefore TypeScript catches the mistake.

---

# 13. Generic Interface Mental Model

Think:

```text
Box<T>
   │
   ├── Box<number>
   │       ↓
   │    content: number
   │
   ├── Box<string>
   │       ↓
   │    content: string
   │
   └── Box<User>
           ↓
        content: User
```

The interface is reusable.

The actual type is supplied later.

---

# 14. Generics Are Type Parameters

This is the easiest way to remember them.

Normal function:

```ts
function greet(name: string) {}
```

`name` is a **value parameter**.

Generic function:

```ts
function wrapArray<T>(item: T) {}
```

`T` is a **type parameter**.

So:

```text
Normal parameter
    ↓
value

Generic parameter
    ↓
type
```

This is the heart of generics.

---

# 15. Generic API Response

This is where generics become extremely useful in real applications.

Suppose your backend returns:

```text
status
data
```

But `data` can be different depending on the API.

For example:

```text
/users
    ↓
data = User[]

/products
    ↓
data = Product[]

/orders
    ↓
data = Order[]
```

Instead of creating separate interfaces:

```ts
interface UserResponse {
    status: number;
    data: User[];
}

interface ProductResponse {
    status: number;
    data: Product[];
}
```

we can create one generic interface:

```ts
interface ApiResponse<T> {
    status: number;
    data: T;
}
```

Now:

```ts
ApiResponse<User[]>
```

means:

```text
status → number
data   → User[]
```

And:

```ts
ApiResponse<Product[]>
```

means:

```text
status → number
data   → Product[]
```

---

# 16. Your Example

```ts
interface ApiPromise<T> {
    status: number;
    data: T;
}
```

Then:

```ts
const res: ApiPromise<{ flavor: string }> = {
    status: 200,
    data: {
        flavor: "masala"
    }
};
```

Here:

```text
T
↓
{ flavor: string }
```

Therefore TypeScript effectively sees:

```ts
interface ApiPromise {
    status: number;
    data: {
        flavor: string;
    };
}
```

So this works:

```ts
res.data.flavor;
```

because TypeScript knows that `data` has a `flavor` property.

---

# 17. Generic API Responses in Real Applications

A more realistic example:

```ts
interface User {
    id: number;
    name: string;
}

interface ApiResponse<T> {
    status: number;
    data: T;
}
```

For a single user:

```ts
const response: ApiResponse<User> = {
    status: 200,

    data: {
        id: 1,
        name: "Dev"
    }
};
```

For multiple users:

```ts
const response: ApiResponse<User[]> = {
    status: 200,

    data: [
        {
            id: 1,
            name: "Dev"
        },
        {
            id: 2,
            name: "Rahul"
        }
    ]
};
```

Same interface.

Different `T`.

---

# 18. Generics + Functions

You can combine generic interfaces with generic functions.

```ts
interface ApiResponse<T> {
    status: number;
    data: T;
}
```

Then:

```ts
function createResponse<T>(
    data: T
): ApiResponse<T> {

    return {
        status: 200,
        data
    };
}
```

Now:

```ts
const userResponse = createResponse({
    id: 1,
    name: "Dev"
});
```

TypeScript infers:

```text
T = {
    id: number;
    name: string;
}
```

Therefore:

```text
userResponse
    ↓
ApiResponse<{
    id: number;
    name: string;
}>
```

---

# 19. Why This Is Better Than `any`

You might wonder:

> Why not just use `any` for API data?

For example:

```ts
interface BadApiResponse {
    status: number;
    data: any;
}
```

Now TypeScript gives up.

You could write:

```ts
response.data.foo.bar.xyz;
```

and TypeScript wouldn't protect you.

With generics:

```ts
interface ApiResponse<T> {
    status: number;
    data: T;
}
```

we preserve the actual type.

```text
any
 ↓
information lost

generic
 ↓
information preserved
```

This is one of the biggest reasons generics exist.

---

# 20. Generics + Utility Types

Generic types can also work with utility types such as:

```text
Partial
Required
Readonly
Pick
Omit
Record
```

For example:

```ts
interface User {
    id: number;
    name: string;
    age: number;
}
```

We can create:

```ts
type UpdateUser = Partial<User>;
```

Now:

```ts
{
    id?: number;
    name?: string;
    age?: number;
}
```

Generics and utility types often appear together in real TypeScript applications.

---

# 21. Generics in React

You will frequently see generics when working with React.

For example, state can have a specific type:

```ts
const [users, setUsers] = useState<User[]>([]);
```

Conceptually:

```text
useState<T>
     │
     ▼
T = User[]
```

So React knows:

```text
users → User[]
```

and:

```ts
setUsers(...)
```

expects compatible data.

The same concept applies to:

```text
form state
API responses
component props
hooks
event handlers
tables
lists
```

---

# 22. Generics in Backend Development

Generics become especially useful in backend systems.

Imagine a standard API response:

```ts
interface ApiResponse<T> {
    status: number;
    data: T;
    message?: string;
}
```

Then:

```ts
ApiResponse<User>
```

```ts
ApiResponse<User[]>
```

```ts
ApiResponse<Product>
```

```ts
ApiResponse<Order[]>
```

All use the same response structure.

```text
                ApiResponse<T>
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
        User       Product      Order[]
          │           │           │
          ▼           ▼           ▼
      data: User  data: Product data: Order[]
```

This is exactly the kind of reusable typing you'll encounter in backend code.

---

# 23. Generic Constraints

Generics can also be restricted.

Suppose we write:

```ts
function getLength<T>(value: T) {
    return value.length;
}
```

TypeScript complains.

Why?

Because `T` could be:

```text
number
boolean
object
...
```

and those don't necessarily have `.length`.

We can constrain `T`:

```ts
function getLength<T extends { length: number }>(
    value: T
): number {
    return value.length;
}
```

Now TypeScript knows:

```text
T MUST have length: number
```

Therefore:

```ts
getLength("chai");
getLength([1, 2, 3]);
```

work.

But:

```ts
getLength(42); // ❌
```

doesn't.

---

# 24. What Does `extends` Mean in Generics?

This:

```ts
<T extends Something>
```

doesn't mean inheritance in the usual OOP sense.

It means:

> **T must satisfy this constraint.**

For example:

```ts
<T extends { length: number }>
```

means:

```text
T can be anything
BUT
it must have length: number
```

Mental model:

```text
T
│
├── string        ✅
├── array         ✅
├── custom object with length ✅
└── number        ❌
```

---

# 25. Generic Naming Conventions

Common names include:

```text
T → Type
K → Key
V → Value
E → Element
R → Return
```

Example:

```ts
function getValue<T>(value: T): T {
    return value;
}
```

Multiple:

```ts
function pair<K, V>(key: K, value: V) {
    return { key, value };
}
```

The names themselves don't have special meaning.

This:

```ts
<T>
```

and:

```ts
<Data>
```

work the same way.

---

# 26. Generic Mental Model

Think of a generic as a **placeholder for a type**.

```ts
function wrapArray<T>(item: T): T[] {
    return [item];
}
```

Before calling:

```text
T = ?
```

Call:

```ts
wrapArray("chai");
```

Now:

```text
T = string
```

Call:

```ts
wrapArray(42);
```

Now:

```text
T = number
```

Call:

```ts
wrapArray({ flavor: "masala" });
```

Now:

```text
T = { flavor: string }
```

So:

```text
Generic
   ↓
Type placeholder
   ↓
Actual type supplied/inferred
   ↓
Type-safe reusable code
```

---

# 27. Generics vs `any`

This comparison is extremely important.

### `any`

```ts
function wrap(value: any): any {
    return value;
}
```

You lose type information.

### Generic

```ts
function wrap<T>(value: T): T {
    return value;
}
```

The relationship between input and output is preserved.

```text
any:

input  → anything
output → anything


generic:

input  → T
           ↓
output → T
```

That's the power of generics.

---

# 28. Common Real-World Uses

Generics appear everywhere in TypeScript projects.

### API responses

```ts
ApiResponse<User>
```

### Collections

```ts
Array<User>
```

### Promises

```ts
Promise<User>
```

### React state

```ts
useState<User[]>([])
```

### Reusable functions

```ts
function wrap<T>(value: T): T
```

### Reusable classes

```ts
class Repository<T> {}
```

### Reusable interfaces

```ts
interface Box<T> {}
```

### Utility types

```ts
Partial<User>
Pick<User, "name">
Record<string, User>
```

---

# 29. Final Mental Model

Don't think:

> "Generics are complicated syntax."

Think:

> **"Generics let me make the TYPE configurable."**

Normal function:

```text
value is configurable
```

Generic function:

```text
type is configurable
```

For example:

```ts
function wrapArray<T>(item: T): T[] {
    return [item];
}
```

means:

```text
             T = ?
              │
      ┌───────┼────────┐
      ▼       ▼        ▼
    string   number   User
      │       │        │
      ▼       ▼        ▼
  string[] number[]  User[]
```

---

# 🎯 What You Actually Need to Remember

### 1. Generic = type parameter

```ts
<T>
```

Think:

```text
T → Type
```

---

### 2. Same `T` means same type relationship

```ts
function wrap<T>(value: T): T {
    return value;
}
```

Input and output are connected.

---

### 3. Multiple generic parameters are possible

```ts
function pair<A, B>(a: A, b: B): [A, B] {
    return [a, b];
}
```

---

### 4. Generics work with interfaces

```ts
interface Box<T> {
    content: T;
}
```

Use:

```ts
Box<number>
Box<string>
Box<User>
```

---

### 5. Generics preserve type information

```text
any
 ↓
type information lost

generic
 ↓
type information preserved
```

---

### 6. Generics can be constrained

```ts
<T extends { length: number }>
```

means:

```text
T must have length: number
```

---

### 7. Generics are everywhere

```text
API responses
React
Promises
Arrays
Repositories
Forms
Collections
Utility types
Backend architecture
```

## 🧠 One-Line Definition

> **Generics allow us to write reusable code where the type itself can be supplied as a parameter, while still preserving TypeScript's type safety.**

```text
                 GENERICS
                    │
                    ▼
             Type as parameter
                    │
                    ▼
          ┌─────────┼─────────┐
          ▼         ▼         ▼
        string    number     User
          │         │         │
          ▼         ▼         ▼
      reusable  reusable  reusable
        code      code      code
                    │
                    ▼
              Type Safe 🚀
```