import {RuleTester} from "eslint";

import {rules} from "../../src/index";

const parserOptions = {
    parser: require.resolve("@babel/eslint-parser"),
};

const ruleTester = new RuleTester(parserOptions);
const rule = rules["flow-exact-state"];

const message = rule.__message;
const errors = [message];

ruleTester.run("flow-exact-state", rule, {
    valid: [
        {
            code: `
        type Props = { x: number };
        type State = {| x: number |};
        class Foo extends React.Component<Props, State> {}`,
        },
        {
            code: `
        type FooProps = { x: number };
        type BarState = { x: number };
        type FooState = {| x: number |};
        class Foo extends React.Component<FooProps, FooState> {}`,
        },
    ],
    invalid: [
        {
            code: `
        type Props = {| x: number |};
        type State = { x: number };
        class Foo extends React.Component<Props, State> {}`,
            errors: ['"State" type should be exact'],
            output: `
        type Props = {| x: number |};
        type State = {| x: number |};
        class Foo extends React.Component<Props, State> {}`,
        },
        {
            code: `
        type FooProps = {| x: number |};
        type FooState = { x: number };
        class Foo extends React.Component<FooProps, FooState> {}`,
            errors: ['"FooState" type should be exact'],
            output: `
        type FooProps = {| x: number |};
        type FooState = {| x: number |};
        class Foo extends React.Component<FooProps, FooState> {}`,
        },
        {
            code: `
        type FooProps = { x: number };
        type FooState = { x: number };
        class Foo extends React.Component<FooProps, FooState> {}
        type BarProps = { x: number };
        type BarState = { x: number };
        class Bar extends React.Component<BarProps, BarState> {}`,
            errors: [
                '"FooState" type should be exact',
                '"BarState" type should be exact',
            ],
            output: `
        type FooProps = { x: number };
        type FooState = {| x: number |};
        class Foo extends React.Component<FooProps, FooState> {}
        type BarProps = { x: number };
        type BarState = {| x: number |};
        class Bar extends React.Component<BarProps, BarState> {}`,
        },
    ],
});
