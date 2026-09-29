# TypeScript — Functions

## 📌 Overview

Functions in TypeScript work like JavaScript functions, but TypeScript allows us to describe:

* Parameter types
* Return types
* Optional parameters
* Functions that don't return a value

The main idea is:

> **TypeScript lets us define what a function expects and what it promises to return.**

---

# 1. Parameter Types

We can specify the type of every parameter.

```ts id="k1z4k7"
function makeChai(type: string, cups: number) {
    console.log(`Making ${cups} cups of ${type} chai`);
}

makeChai("masala", 3);
```

Here:

```text id="iy9f9n"
type → string
cups → number
```

So:

```ts id="a1w5nt"
makeChai("masala", 3); // ✅
```

But:

```ts id="1a7n5r"
makeChai(3, "masala"); // ❌
```

because the arguments don't match the parameter types.

### Mental Model

```text id="p4a2x6"
Function
   │
   ├── type → string
   └── cups → number

Arguments must match
the expected types.
```

---

# 2. Return Type

We can also explicitly specify what type a function should return.

Syntax:

```ts id="s7f5sa"
function functionName(): returnType {
    // ...
}
```

Example:

```ts id="4x7j5e"
function getChaiPrice(type: string, cups: number): number {

    if (type === "masala") {
        return cups * 10;
    }

    if (type === "green") {
        return cups * 15;
    }

    return cups * 20;
}
```

The `: number` after the parentheses means:

> **This function must return a number.**

Therefore:

```ts id="8ym5t6"
return cups * 10;
```

is valid.

But:

```ts id="e7r0m4"
return "10";
```

would produce an error because `"10"` is a string.

```text id="qj34e1"
Expected return type:
number

Actual:
string ❌
```

---

# 3. Why Specify Return Types?

TypeScript can often **infer the return type automatically**.

For example:

```ts id="z5pj3x"
function add(a: number, b: number) {
    return a + b;
}
```

TypeScript can infer:

```text id="k8m0l4"
(a: number, b: number) → number
```

So writing:

```ts id="p0d7kf"
function add(a: number, b: number): number
```

isn't always necessary.

However, explicit return types can make the function's **contract** clearer and can catch mistakes.

Think:

```text id="1n5z1k"
Parameters → What does the function accept?

Return type → What does the function promise to return?
```

---

# 4. `void`

Some functions perform an action but don't return a useful value.

For example:

```ts id="2k9b2e"
function login(): void {
    console.log("User logged in");
}
```

`void` means:

> **This function does not return a meaningful value.**

We call:

```ts id="y5e7k5"
login();
```

The function performs an action:

```text id="v1lq0e"
login()
   │
   ▼
console.log(...)
   │
   ▼
No useful return value
```

---

# 5. `void` vs `return`

Consider:

```ts id="w0m3y1"
function login(): void {
    console.log("User logged in");
}
```

There is no useful value returned.

Compare that with:

```ts id="b8x7z9"
function getUserName(): string {
    return "Dev";
}
```

Here the function produces a value:

```text id="0l6zv9"
getUserName()
      ↓
   "Dev"
```

So:

```text id="l5u4c1"
void   → performs an action
string → returns a string
number → returns a number
```

---

# 6. Optional Parameters

A parameter can be made optional using `?`.

```ts id="5h8d9x"
function orderChai(
    type?: string,
    cups?: number
): string {

    if (type === "masala") {
        return `Your order of ${cups} cups of ${type} chai is ready`;
    }

    return `Your order of ${cups} cups of chai is ready`;
}
```

Now we can call:

```ts id="0g7v9j"
orderChai();
```

or:

```ts id="5c3b8w"
orderChai("masala");
```

or:

```ts id="b8q5v3"
orderChai("masala", 3);
```

Because both parameters are optional.

Conceptually:

```text id="k2h7pj"
type → string | undefined
cups → number | undefined
```

If the caller doesn't provide the parameter, it can be `undefined`.

---

# 7. Optional Parameters Must Come Last

This is an important TypeScript rule.

This is valid:

```ts id="f7s5v1"
function orderChai(
    type: string,
    cups?: number
) {
}
```

Because:

```text id="0z5c3p"
required → optional
```

But you cannot normally put an optional parameter before a required parameter:

```ts id="3j1z6k"
function orderChai(
    type?: string,
    cups: number
) {
}
```

Why?

Imagine calling:

```ts id="1d6x3f"
orderChai("masala");
```

Which parameter is `"masala"` supposed to represent?

```text
type?
cups?
```

The function call becomes ambiguous.

Therefore TypeScript requires:

```text id="7t9m3h"
required parameters
        ↓
optional parameters
```

---

# 8. Function Parameters vs Arguments

These terms are easy to mix up.

In:

```ts id="g0k9q3"
function makeChai(type: string, cups: number) {
}
```

`type` and `cups` are **parameters**.

When we call:

```ts id="q8d3s2"
makeChai("masala", 3);
```

`"masala"` and `3` are **arguments**.

```text id="n3g4k7"
Parameters                Arguments
    │                         │
    ▼                         ▼
type: string             "masala"
cups: number             3
```

---

# 9. Function as a Contract

A useful way to think about typed functions is as a **contract**.

For:

```ts id="9w5q1s"
function getChaiPrice(
    type: string,
    cups: number
): number
```

the contract is:

```text id="z0f5b4"
INPUT
 ├── type → string
 └── cups → number

OUTPUT
 └── number
```

So TypeScript can protect both sides:

```text id="6c7v4p"
        Function
           │
    ┌──────┴──────┐
    ▼             ▼
  Input         Output
    │             │
    ▼             ▼
 parameter     return type
    │             │
    ▼             ▼
  string        number
  number
```

---

# 10. Type Inference Still Works

You don't have to annotate everything.

For example:

```ts id="s4h8v2"
function getPrice(cups: number) {
    return cups * 10;
}
```

TypeScript can infer:

```text id="r3x9m1"
getPrice
   │
   └── (cups: number) → number
```

Because `cups * 10` produces a number.

So TypeScript gives you flexibility:

```text id="7n4c5z"
Explicit typing
      OR
Type inference
```

Use explicit annotations when they make the function's contract clearer or prevent accidental changes.

---

# 🧠 Core Mental Model

Think of every function as:

```text id="p5k3x9"
             FUNCTION
                 │
        ┌────────┴────────┐
        ▼                 ▼
      INPUT             OUTPUT
        │                 │
        ▼                 ▼
   Parameters         Return Type
        │                 │
        ▼                 ▼
     string             number
     number
```

For example:

```ts id="q4t6w8"
function getChaiPrice(
    type: string,
    cups: number
): number {
    return cups * 10;
}
```

means:

> **"Give me a string and a number, and I promise to give you a number back."**

---

# 🎯 What You Should Remember

### 1. Parameter types

```ts id="y7c2v4"
function makeChai(type: string, cups: number)
```

Define what the function accepts.

### 2. Return type

```ts id="x8n3k5"
function getPrice(): number
```

Defines what the function returns.

### 3. `void`

```ts id="w6p2r8"
function login(): void
```

The function doesn't return a useful value.

### 4. Optional parameters

```ts id="m4q9s1"
function orderChai(type?: string)
```

The parameter may be omitted.

### 5. Optional parameters come after required parameters

```text id="a8z5v2"
required → required → optional → optional
```

### 6. TypeScript can infer return types

You don't always need to explicitly write them.

---

# 🔥 Final Cheat Sheet

| Concept            | Meaning                        | Example               |
| ------------------ | ------------------------------ | --------------------- |
| Parameter type     | Type of input                  | `name: string`        |
| Return type        | Type returned                  | `(): number`          |
| `void`             | No useful return value         | `(): void`            |
| Optional parameter | Parameter may be omitted       | `name?: string`       |
| Parameter          | Variable defined by function   | `function test(name)` |
| Argument           | Actual value passed            | `test("Dev")`         |
| Type inference     | TypeScript determines the type | `return a + b`        |

### One-line mental model

> **A typed function defines a contract: what it accepts as input, and what it promises to return as output.**

[Check out the interface code](./src/8_functions.ts)