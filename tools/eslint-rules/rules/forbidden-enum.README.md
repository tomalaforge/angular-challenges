<h1>Create a eslint rule to forbid enums</h1>

> Author: Thomas Laforge

### Information

Eslint is an amazing tool that helps developers avoid simple mistakes and adhere to company style guides.

In this first example, we will create a rule that forbids the use of enums. The rule will suggest using string unions instead of enums whenever you add an enum to your code. It is a straightforward rule for learning how to create rules.

You will also need to write tests to verify the rule's functionality.

To test the rule inside your project, add `"@nrwl/nx/workspace/forbidden-enum": "error"` to the `eslintrc.json` file and attempt to insert an enum into any project to witness the magic. 😇

To assist you with AST (Abstract Syntax Tree) definitions, you can visit the [AST explorer](https://astexplorer.net/) and use JavaScript, @typescript-eslint/parser, and Eslint-v8 as the transformation method. However, please note that you will only get the type information there. The transformation function may not work for TypeScript types since the editor is in JavaScript.

You can also check this [repo](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/rules) for eslint rule examples.

### Submitting your work

1. Fork the project
2. clone it
3. npm ci
4. _...work on it_
5. `npx nx test eslint-rules`
6. Commit your work
7. Submit a PR with a title beginning with **Answer:27** that I will review and other dev can review.

<a href="https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A27+label%3Aanswer"><img src="https://img.shields.io/badge/-Solutions-green" alt="forbidden-enum"/></a>
<a href='https://github.com/tomalaforge/angular-challenges/pulls?q=label%3A27+label%3A"answer+author"'><img src="https://img.shields.io/badge/-Author solution-important" alt="forbidden-enum solution author"/></a>

<!-- <a href="{Blog post url}" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/-Blog post explanation-blue" alt="forbidden-enum blog article"/></a> -->

_You can ask any question on_ <a href="https://twitter.com/laforge_toma" target="_blank" rel="noopener noreferrer"><img src="./../../../logo/twitter.svg" height=20px alt="twitter"/></a>
