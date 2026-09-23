# TypeScript Compiler — How TypeScript Works

## 📌 Overview

TypeScript is not directly executed by the browser or Node.js.

The TypeScript compiler (`tsc`) takes our `.ts` code, understands it, checks it, and finally **emits JavaScript and other output files**.

The main idea is:

```text
TypeScript Code
      │
      ▼
   Parser
      │
      ▼
     AST
      │
      ▼
    Binder
      │
      ▼
 Symbol Tables
      │
      ▼
   Type Checker
      │
      ▼
    Emitter
      │
      ├──────────────► .js
      ├──────────────► .d.ts
      └──────────────► .js.map
```

Think of the compiler as a pipeline where every stage has a specific responsibility.

---

# 🔄 TypeScript Compilation Pipeline

## 1. Parser

The **Parser** is the first major stage.

It takes our TypeScript source code and understands its structure.

For example:

```ts
let username: string = "devdoshi";
```

The parser doesn't simply treat this as plain text.

It breaks the code into a structured representation called an **Abstract Syntax Tree (AST)**.

---

# 🌳 2. Abstract Syntax Tree (AST)

An **AST** is a tree-like representation of the source code.

For example:

```ts
let age = 19;
```

can conceptually be represented as:

```text
Variable Declaration
       │
       ├── Name
       │    └── age
       │
       └── Initializer
            └── 19
```

The AST allows the compiler to understand:

* Variables
* Functions
* Expressions
* Statements
* Types
* Operators
* Relationships between different parts of the code

### Important idea

> **AST = structured representation of our code.**

The parser creates this structure so the later compiler stages can work with the code meaningfully.

---

# 🔗 3. Binder

After parsing, TypeScript needs to understand **what the different names in the program refer to**.

This is where the **Binder** comes in.

The Binder connects declarations and creates the information needed to understand relationships between identifiers.

It creates and maintains concepts such as:

* **Symbol Tables**
* **Symbols**
* **Parent relationships**
* **Flow information / Flow Nodes**

Conceptually:

```text
AST
 │
 ▼
Binder
 │
 ├── Symbol Table
 │     ├── username
 │     ├── age
 │     └── calculate
 │
 ├── Parent relationships
 │
 └── Flow information
```

### Symbol Table

A symbol table helps TypeScript answer questions like:

> "What does this `username` refer to?"

For example:

```ts
let username = "devdoshi";

console.log(username);
```

The Binder helps connect the `username` being used in `console.log()` to the declaration of `username`.

### Important idea

> **Binder = connects names/declarations and builds symbol information.**

---

# 🧠 4. Type Checker

This is one of the most important parts of TypeScript.

The **Type Checker** analyzes the program and checks whether the code follows TypeScript's type system.

For example:

```ts
let username: string = "devdoshi";

username = 123;
```

The Type Checker can identify:

```text
string ← ❌ ← number
```

and report a type error.

The checker also handles things such as:

* Type compatibility
* Type inference
* Function types
* Generics
* Control-flow analysis
* Narrowing
* Syntax-related checks
* Short-circuit/control-flow behavior

Conceptually:

```text
AST + Symbols
      │
      ▼
 Type Checker
      │
      ├── What is this variable's type?
      ├── Are these types compatible?
      ├── What does this expression return?
      └── Is this usage valid?
```

### Important idea

> **Checker = understands and validates the meaning and types of the program.**

---

# ⚙️ 5. Emitter

Once TypeScript has understood and checked the program, the **Emitter** generates the output files.

For example:

```text
                 Emitter
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
      .js         .d.ts       .js.map
```

### `.js`

The JavaScript output that can actually be executed by JavaScript runtimes.

### `.d.ts`

Declaration files containing type information.

They are useful for describing the types of JavaScript code, especially when TypeScript needs type information without the implementation.

### `.js.map`

Source map files that help map generated JavaScript back to the original TypeScript source.

This is useful for debugging.

### Important idea

> **Emitter = produces the final output files.**

---

# 🧩 Complete Mental Model

The entire process can be remembered like this:

```text
             TypeScript Source
                    │
                    ▼
              ┌───────────┐
              │   Parser  │
              └─────┬─────┘
                    │
                    ▼
              ┌───────────┐
              │    AST    │
              │ Tree-like │
              │ structure │
              └─────┬─────┘
                    │
                    ▼
              ┌───────────┐
              │   Binder  │
              └─────┬─────┘
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
       Symbols   Parent    Flow Nodes
       /Tables  Relations
          │
          └─────────┬─────────┘
                    ▼
              ┌───────────┐
              │   Type    │
              │  Checker  │
              └─────┬─────┘
                    │
                    ▼
              ┌───────────┐
              │  Emitter  │
              └─────┬─────┘
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
       .js        .d.ts       .js.map
```

---

# 🧠 The Simplest Way to Remember It

Don't try to memorize the internal implementation.

Just remember the **responsibility of each stage**:

| Stage            | Main Responsibility                                  |
| ---------------- | ---------------------------------------------------- |
| **Parser**       | Understands the source code structure                |
| **AST**          | Represents the code as a tree                        |
| **Binder**       | Connects declarations and creates symbol information |
| **Symbol Table** | Keeps track of symbols/names                         |
| **Type Checker** | Checks types and program correctness                 |
| **Emitter**      | Generates output files                               |
| **`.js`**        | Executable JavaScript                                |
| **`.d.ts`**      | Type declarations                                    |
| **`.js.map`**    | Maps JS back to TS for debugging                     |

### One-line mental model

> **Parser understands the structure → AST represents it → Binder connects names → Checker validates it → Emitter produces the output.**

---

# 🎯 Why This Matters

As a TypeScript developer, you don't need to know how the compiler is implemented internally.

What matters is understanding **why these stages exist**.

When you understand the pipeline, TypeScript becomes less like a collection of random features and more like a system:

```text
Source Code
    ↓
Understand
    ↓
Structure
    ↓
Connect
    ↓
Check
    ↓
Generate
```

That is the core idea behind how TypeScript turns `.ts` code into usable JavaScript.
