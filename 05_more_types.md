# TypeScript — Type Assertions, `unknown` & `never`

## 📌 Overview

Three TypeScript concepts that are easy to confuse are:

```text
Type Assertion
any
unknown
never
```

They solve **different problems**.

The most important distinction is:

```text
Type Assertion → "I know more than TypeScript."
any            → "Don't type-check this value."
unknown        → "We don't know the type yet. Check it first."
never          → "This value/state can never exist."
```

These concepts are closely connected to **type narrowing**, so understanding their relationship is important.

---

# 1. Type Assertion

A **type assertion** tells TypeScript:

> "I know the type of this value better than you do. Treat it as this type."

Syntax:

```ts
value as Type
```

Example:

```ts
let response: any = "42";

let numericLength: number = (response as string).length;
```

Here:

```text
response
   ↓
any
   ↓
"Treat this as a string"
   ↓
(response as string)
   ↓
.length
```

TypeScript now allows us to use string properties and methods.

---

## ⚠️ Important: Assertion Does NOT Convert the Value

This is extremely important.

```ts
let value = 42;

let text = value as string;
```

The value is **still a number at runtime**.

The assertion does not perform:

```text
number → string
```

It only tells the TypeScript compiler:

```text
"Assume this value is a string."
```

So:

> **Type assertion changes TypeScript's understanding, not the actual runtime value.**

---

# 2. Type Assertion vs Type Conversion

These are completely different.

### Type Assertion

```ts
let value = someValue as string;
```

No runtime conversion happens.

### Type Conversion

```ts
let value = String(someValue);
```

The actual JavaScript value is converted.

```text
Assertion:
TypeScript's view changes

Conversion:
Runtime value changes
```

This distinction is extremely important.

---

# 3. JSON + Type Assertion

Consider:

```ts
type Book = {
    name: string;
};

let bookString = `{
    "name": "The Man, The Mole, The Fox and The Horse"
}`;

let bookObject = JSON.parse(bookString) as Book;

console.log(bookObject.name);
```

`JSON.parse()` returns a value that TypeScript cannot automatically know is a `Book`.

We are telling TypeScript:

```text
"I know that this parsed object follows the Book structure."
```

So:

```ts
JSON.parse(bookString) as Book
```

means:

```text
JSON data
    ↓
"I believe this is a Book"
    ↓
Treat it as Book
```

### ⚠️ But there is a catch

TypeScript does **not** validate the JSON at runtime.

Suppose:

```ts
let bookString = `{
    "title": "Something"
}`;
```

and we still write:

```ts
let bookObject = JSON.parse(bookString) as Book;
```

TypeScript will accept the assertion.

But the actual object doesn't have:

```text
name
```

So an assertion is **not validation**.

---

# 4. DOM Type Assertions

Another common use is working with the browser DOM.

```ts
const inputElement =
    document.getElementById("username") as HTMLInputElement;

console.log(inputElement.value);
```

`document.getElementById()` does not know that the element is specifically an `<input>`.

You may know this because your HTML contains:

```html
<input id="username">
```

So you tell TypeScript:

```ts
as HTMLInputElement
```

Now TypeScript allows:

```ts
inputElement.value
```

because `value` is a property of `HTMLInputElement`.

### Mental model

```text
TypeScript:
"I don't know exactly what element this is."

You:
"I know it's an input."

TypeScript:
"Okay, I'll treat it as HTMLInputElement."
```

Again, **you are responsible for making sure the assertion is correct.**

---

# 5. `any`

`any` means:

> **"Turn off meaningful type checking for this value."**

Example:

```ts
let value: any;

value = "chai";
value = [1, 2, 3];
value = 2.5;
```

TypeScript allows all of these.

You can also do:

```ts
value.toUpperCase();
```

The problem is that at runtime:

```text
value → 2.5
```

and numbers don't have:

```ts
toUpperCase()
```

So the program can fail.

---

# 6. Why `any` Is Dangerous

Consider:

```ts
let value: any = "hello";

console.log(value.toUpperCase());
```

Everything works.

Later someone changes:

```ts
value = 42;
```

The code still compiles because `value` is `any`.

But:

```ts
value.toUpperCase();
```

now fails at runtime.

```text
TypeScript
    │
    ▼
"any? Okay, I won't check."
    │
    ▼
JavaScript
    │
    ▼
Runtime Error ❌
```

This is why excessive use of `any` defeats a major purpose of TypeScript.

---

# 7. `unknown`

`unknown` is different.

It means:

> **"We don't know what this value is yet."**

Example:

```ts
let value: unknown;

value = "chai";
value = [1, 2, 3];
value = 2.5;
```

All assignments are allowed.

But:

```ts
value.toUpperCase();
```

is **not allowed**.

Why?

Because TypeScript doesn't know whether `value` is a string.

It could be:

```text
string
array
number
object
boolean
...
```

So TypeScript says:

> "Prove what this value is first."

---

# 8. `unknown` Forces Type Narrowing

This is where **type narrowing comes back**.

```ts
let value: unknown = "chai";

if (typeof value === "string") {
    value.toUpperCase();
}
```

Before the check:

```text
value → unknown
```

After:

```ts
typeof value === "string"
```

TypeScript narrows:

```text
value → string
```

Now:

```ts
value.toUpperCase();
```

is safe.

So the relationship is:

```text
unknown
   ↓
Type Check
   ↓
Type Narrowing
   ↓
Specific Type
   ↓
Safe Operation
```

### This is one of the most important connections in TypeScript.

> **`unknown` is often the starting point, and type narrowing is the process used to safely discover what it is.**

---

# 9. `any` vs `unknown`

This distinction is worth remembering permanently.

|                           | `any` | `unknown` |
| ------------------------- | ----- | --------- |
| Can store any value?      | ✅     | ✅         |
| Can directly use methods? | ✅     | ❌         |
| Type checking preserved?  | ❌     | ✅         |
| Requires narrowing?       | ❌     | ✅         |
| Safer?                    | ❌     | ✅         |

Think:

```text
any
 ↓
"Do whatever you want."

unknown
 ↓
"You can store anything,
but prove the type before using it."
```

---

# 10. Where Type Narrowing Fits

You have now learned several narrowing techniques:

```ts
typeof
instanceof
in
=== / !==
truthiness
type predicates
discriminated unions
```

They all solve the same fundamental problem:

> **"What specific type is this value right now?"**

For example:

```ts
let value: unknown;

if (typeof value === "string") {
    // value → string
}
```

Or:

```ts
if (value instanceof SomeClass) {
    // value → SomeClass
}
```

Or:

```ts
if ("name" in value) {
    // value has a name property
}
```

Or through a custom type predicate:

```ts
if (isUser(value)) {
    // value → User
}
```

So don't learn these as unrelated features.

They are all **ways of narrowing a broad type into a more specific type.**

---

# 11. `never`

Now we come to the most misunderstood type.

`never` means:

> **A value that can never exist.**

It represents an impossible state or a computation that never successfully produces a value.

There are two major situations where you'll see `never`.

---

# 12. `never` with Functions That Never Return

Consider:

```ts
function neverReturn(): never {
    while (true) {
    }
}
```

This function never finishes.

It gets stuck forever:

```text
function starts
      ↓
while(true)
      ↓
never ends
```

Therefore it doesn't return:

```text
string
number
boolean
undefined
```

It returns **nothing because execution never reaches a return point**.

That's why:

```ts
: never
```

is appropriate.

---

# 13. `never` with Throwing Functions

Another example:

```ts
function throwError(message: string): never {
    throw new Error(message);
}
```

This function also never successfully returns.

It either:

```text
throws an error
     ↓
execution stops
```

Therefore its return type is:

```ts
never
```

---

# 14. `never` and Exhaustive Checking

This is where `never` becomes particularly useful.

Consider:

```ts
type Role = "admin" | "user";
```

Now:

```ts
function redirectBasedOnRole(role: Role): void {

    if (role === "admin") {
        console.log("Redirecting to admin dashboard");
        return;
    }

    if (role === "user") {
        console.log("Redirecting to user dashboard");
        return;
    }

    role;
}
```

At the final line:

```ts
role;
```

TypeScript knows something interesting.

We already handled:

```text
"admin"
"user"
```

But those are the **only possible values** of `Role`.

Therefore there is nothing left.

So:

```text
role → never
```

---

# 15. Why Does `role` Become `never`?

Start with:

```text
Role
 ├── "admin"
 └── "user"
```

First:

```ts
if (role === "admin")
```

removes:

```text
"admin"
```

Remaining:

```text
"user"
```

Then:

```ts
if (role === "user")
```

removes:

```text
"user"
```

Remaining:

```text
nothing
```

Therefore:

```text
role → never
```

This is a very important way to understand `never`.

> **`never` can represent the empty set of possible values.**

---

# 16. `never` as an Exhaustiveness Check

This becomes especially useful with larger unions.

```ts
type Role =
    | "admin"
    | "user"
    | "moderator";
```

We can create:

```ts
function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}
```

Then:

```ts
function redirect(role: Role) {

    switch (role) {

        case "admin":
            return "Admin dashboard";

        case "user":
            return "User dashboard";

        case "moderator":
            return "Moderator dashboard";

        default:
            return assertNever(role);
    }
}
```

If every possible role has been handled, the `default` branch should be impossible.

Therefore:

```text
role → never
```

If we later add:

```ts
"guest"
```

to the union but forget to add a case, TypeScript will detect the problem.

That's the purpose of the `never` check.

---

# 17. Why This Connects to Type Narrowing

This is an important connection between the topics you've learned.

Suppose:

```ts
type Status =
    | "loading"
    | "success"
    | "error";
```

Initially:

```text
status
 ├── loading
 ├── success
 └── error
```

We narrow:

```ts
case "loading":
```

Remaining:

```text
success | error
```

Then:

```ts
case "success":
```

Remaining:

```text
error
```

Then:

```ts
case "error":
```

Remaining:

```text
nothing
```

Therefore:

```text
status → never
```

So:

> **`never` is often the result of completely narrowing away every possible type.**

---

# 18. Type Assertion vs Type Narrowing

These two are VERY easy to confuse.

### Type Assertion

```ts
value as string
```

You are telling TypeScript:

> "Trust me. This is a string."

TypeScript does not prove it for you.

---

### Type Narrowing

```ts
if (typeof value === "string") {
    // value is string
}
```

Here TypeScript uses actual information from the condition to determine the type.

```text
Assertion:
"I say it's a string."

Narrowing:
"I checked that it's a string."
```

This distinction is extremely important.

---

# 19. Type Assertion vs Type Predicate

A type assertion:

```ts
value as User
```

simply tells TypeScript:

```text
"Treat this as User."
```

A type predicate:

```ts
function isUser(value: unknown): value is User
```

creates a **runtime check** that can be used for narrowing.

For example:

```ts
function isUser(value: unknown): value is User {
    return (
        typeof value === "object" &&
        value !== null &&
        "name" in value
    );
}
```

Then:

```ts
if (isUser(value)) {
    // value → User
}
```

### Key difference

```text
Assertion
   ↓
You tell TypeScript what to assume.

Type Predicate
   ↓
You create a condition that narrows the type.
```

---

# 20. A Complete Mental Model

All of these concepts fit together:

```text
                       VALUE
                         │
                         ▼
                What do we know?
                         │
              ┌──────────┴──────────┐
              │                     │
          Known type             Unknown data
              │                     │
              │                     ▼
              │                  unknown
              │                     │
              │                Narrow it
              │                     │
              │          ┌──────────┼──────────┐
              │          │          │          │
              │        typeof      in      instanceof
              │          │          │          │
              │          └──────────┼──────────┘
              │                     │
              │                     ▼
              │              Specific type
              │
              ▼
          Use safely
```

And separately:

```text
Type Assertion
      │
      ▼
"I know the type."
      │
      ▼
value as SomeType
```

And:

```text
Union
  │
  ▼
A | B | C
  │
  ▼
Narrowing
  │
  ├── A
  ├── B
  └── C
       │
       ▼
All cases handled
       │
       ▼
     never
```

---

# 🎯 What You Actually Need to Remember

Don't try to memorize every syntax yet.

Focus on these **five ideas**:

## 1. `any`

```ts
let value: any;
```

Means:

> **"TypeScript, don't protect me here."**

Avoid it unless you genuinely need it.

---

## 2. `unknown`

```ts
let value: unknown;
```

Means:

> **"I don't know what this is yet."**

You must narrow it before performing type-specific operations.

---

## 3. Type Narrowing

```ts
if (typeof value === "string") {
```

Means:

> **"I have evidence that this value is a string here."**

This is about **reducing possibilities**.

---

## 4. Type Assertion

```ts
value as User
```

Means:

> **"I am telling TypeScript to treat this value as User."**

It does **not** validate or convert the runtime value.

---

## 5. `never`

```ts
function fail(): never
```

Means:

> **"This code path can never produce a value."**

It is also useful when:

> **"All possible cases of a union have already been handled."**

---

# 🧠 Final Comparison

| Concept        | Think of it as                            |
| -------------- | ----------------------------------------- |
| `any`          | **Don't check this**                      |
| `unknown`      | **We don't know yet**                     |
| Narrowing      | **Let's prove what it is**                |
| Type assertion | **Trust what I'm telling you**            |
| Type predicate | **Here's my custom proof/check**          |
| `never`        | **This cannot happen / no value remains** |

### The complete flow

```text
             External / uncertain value
                       │
                       ▼
                    unknown
                       │
                       ▼
                  Type Guard
                       │
                       ▼
                   Narrowing
                       │
              ┌────────┴────────┐
              ▼                 ▼
          string             number
              │                 │
              ▼                 ▼
         Safe operation    Safe operation
```

And when all possible cases are eliminated:

```text
A | B | C
  │
  ▼
Narrow A
  │
  ▼
Narrow B
  │
  ▼
Narrow C
  │
  ▼
never
```

> **The big picture: TypeScript tries to make uncertain data safer by asking you to describe it, check it, and narrow it before using type-specific behavior.**

[Check out the More_types code](./src/5_moreType.ts)