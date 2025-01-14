import * as path from "path";

import {rules} from "../../src/index";
import {RuleTester} from "eslint";

const parserOptions = {
    parser: require.resolve("@babel/eslint-parser"),
};

const ruleTester = new RuleTester(parserOptions);
const rule = rules["imports-requiring-flow"];

const rootDir = "/Users/nyancat/project";

const importFooPkgFlow = `
// @flow
import foo from "foo";
`;

const importFooPkgNoflow = `
// @noflow
import foo from "foo";
`;

const importBarModFlow = `
// @flow
import bar from "../package-2/bar.js";
`;

const importBarModNoflow = `
// @noflow
import bar from "../package-2/bar.js";
`;

const requireFooPkgFlow = `
// @flow
const foo = require("foo");
`;

const requireFooPkgNoflow = `
// @noflow
const foo = require("foo");
`;

const requireBarModFlow = `
// @flow
const bar = require("../package-2/bar.js");
`;

const requireBarModNoflow = `
// @noflow
const bar = require("../package-2/bar.js");
`;

const dynamicImportFooPkgFlow = `
// @flow
const fooPromise = import("foo");
`;

const dynamicImportFooPkgNoflow = `
// @noflow
const fooPromise = import("foo");
`;

const dynamicImportBarModFlow = `
// @flow
const barPromise = import("../package-2/bar.js");
`;

const dynamicImportBarModNoflow = `
// @noflow
const barPromise = import("../package-2/bar.js");
`;

const importHOCPkgFlow = `
// @flow
import withFoo from "~/foo/with-foo.js";
`;

const importHOCPkgNoflow = `
// @noflow
import withFoo from "~/foo/with-foo.js";
`;

ruleTester.run("imports-requiring-flow", rule, {
    valid: [
        {
            code: importFooPkgFlow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["foo"],
                    rootDir,
                },
            ],
        },
        {
            code: importBarModFlow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["src/package-2/bar.js"],
                    rootDir,
                },
            ],
        },
        {
            code: importBarModFlow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["src/package-2/"],
                    rootDir,
                },
            ],
        },
        {
            code: requireFooPkgFlow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["foo"],
                    rootDir,
                },
            ],
        },
        {
            code: dynamicImportBarModFlow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["src/package-2/bar.js"],
                    rootDir,
                },
            ],
        },
        {
            code: dynamicImportBarModFlow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["src/package-2"],
                    rootDir,
                },
            ],
        },
        {
            code: dynamicImportFooPkgFlow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["foo"],
                    rootDir,
                },
            ],
        },
        {
            code: requireBarModFlow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["src/package-2/bar.js"],
                    rootDir,
                },
            ],
        },
        {
            code: requireBarModFlow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["src/package-2"],
                    rootDir,
                },
            ],
        },
        {
            code: importFooPkgNoflow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["baz"], // isn't imported so it's okay
                    rootDir,
                },
            ],
        },
        {
            code: importBarModNoflow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["baz"], // isn't imported so it's okay
                    rootDir,
                },
            ],
        },
        {
            code: requireFooPkgNoflow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["baz"], // isn't imported so it's okay
                    rootDir,
                },
            ],
        },
        {
            code: requireBarModNoflow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["baz"], // isn't imported so it's okay
                    rootDir,
                },
            ],
        },
        {
            code: dynamicImportBarModNoflow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["baz"], // isn't imported so it's okay
                    rootDir,
                },
            ],
        },
        {
            code: dynamicImportFooPkgNoflow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["baz"], // isn't imported so it's okay
                    rootDir,
                },
            ],
        },
        {
            code: importHOCPkgFlow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    regexes: ["with-"],
                    rootDir,
                },
            ],
        },
        {
            code: importHOCPkgNoflow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    // Regexes doesn't match any of the imports so the import in
                    // importHOCPkgNoflow is valid.
                    regexes: ["use-"],
                    rootDir,
                },
            ],
        },
    ],
    invalid: [
        {
            code: importFooPkgNoflow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["foo"],
                    rootDir,
                },
            ],
            errors: ['Importing "foo" requires using flow.'],
        },
        {
            code: importBarModNoflow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["src/package-2/bar.js"],
                    rootDir,
                },
            ],
            errors: ['Importing "../package-2/bar.js" requires using flow.'],
        },
        {
            code: importBarModNoflow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["src/package-2"],
                    rootDir,
                },
            ],
            errors: ['Importing "../package-2/bar.js" requires using flow.'],
        },
        {
            code: requireFooPkgNoflow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["foo"],
                    rootDir,
                },
            ],
            errors: ['Importing "foo" requires using flow.'],
        },
        {
            code: requireBarModNoflow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["src/package-2/"],
                    rootDir,
                },
            ],
            errors: ['Importing "../package-2/bar.js" requires using flow.'],
        },
        {
            code: requireBarModNoflow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["src/package-2/bar.js"],
                    rootDir,
                },
            ],
            errors: ['Importing "../package-2/bar.js" requires using flow.'],
        },
        {
            code: dynamicImportFooPkgNoflow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["foo"],
                    rootDir,
                },
            ],
            errors: ['Importing "foo" requires using flow.'],
        },
        {
            code: dynamicImportBarModNoflow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["src/package-2/bar.js"],
                    rootDir,
                },
            ],
            errors: ['Importing "../package-2/bar.js" requires using flow.'],
        },
        {
            code: dynamicImportBarModNoflow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    modules: ["src/package-2"],
                    rootDir,
                },
            ],
            errors: ['Importing "../package-2/bar.js" requires using flow.'],
        },
        {
            code: importHOCPkgNoflow,
            filename: path.join(rootDir, "src/package-1/foobar.js"),
            options: [
                {
                    regexes: ["with-"],
                    rootDir,
                },
            ],
            errors: ['Importing "~/foo/with-foo.js" requires using flow.'],
        },
    ],
});
