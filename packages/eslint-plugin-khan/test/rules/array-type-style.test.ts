import {rules} from "../../src/index";
import {RuleTester} from "../RuleTester";

const ruleTester = new RuleTester({
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {},
    },
});

const ruleName = "array-type-style";
const rule = rules[ruleName];

ruleTester.run(ruleName, rule, {
    valid: [
        {
            code: "type foo = { bar: Array<number> }",
        },
    ],
    invalid: [
        {
            code: "type foo = { bar: number[] }",
            errors: [{messageId: "errorString"}],
            output: "type foo = { bar: Array<number> }",
        },
        {
            code: "type foo = { bar: number[][] }",
            // Two errors are reported because there are two array types,
            // they just happen to be nested.
            errors: [{messageId: "errorString"}, {messageId: "errorString"}],
            // This is a partial fix.  Multiple runs of eslint --fix are needed
            // to fix nested (in the AST) array types completely.
            output: "type foo = { bar: Array<number>[] }",
        },
    ],
});
