### Running locally

The NASA Web Design System `nasawds` package (the zip download and the
files needed to use the Design System on your project) is built primarily with
two [Node.js] tools: [Fractal] and [Gulp]. Once you've cloned this
repository, you'll need to install its dependencies:

```sh
npm install
```

**ProTip**: You can also use [Yarn], which tends to install dependencies more quickly than npm.

To start the [Fractal] live reload server, run:

```sh
npm start
```

Then, visit [localhost:3000](http://localhost:3000) in a web browser to
peruse the component library. While the server is running, any changes that
you make to the component templates or configurations will reload the page
automatically.

If you're working on the JavaScript or CSS, you can run the "watch" task in
another shell to automatically rebuild the distribution files that Fractal
references with:

```sh
npm run watch
```

### Testing

To run the component unit tests, run:

```sh
npm test
```

This will also run [eslint] and [stylelint] to ensure that the JavaScript
and SCSS source files meet our coding standards. To lint without the unit
tests, you'll need [Gulp][]. Install it globally (`npm install -g
gulp-cli`), then run:

```sh
gulp eslint
gulp stylelint
```

(Or, if you don't want to install Gulp globally, you can run `$(npm
bin)/gulp` instead of `gulp`.)

Note that running the tests also requires an installation of
Chrome v59 or higher (v60 if you're on Windows).

#### Visual regression testing

The Design System comes with optional tooling for detecting visual regressions,
which can be especially useful if you're refactoring CSS.

These tests work by comparing current screenshots of the Design System's Fractal
components to "golden" screenshots that represent what the components are
supposed to look like.

Golden screenshots are stored on your local development system *only*;
they're not version controlled. This means that after making changes to a branch,
you can switch to the branch you'd like to compare it to (e.g. the `develop`
branch) to generate your golden screenshots.

To generate the golden screenshots, run:

```
node spec/visual-regression-tester.js test --updateGolden
```

Then, make any CSS refactorings (or switch to a branch that has them).

To compare the current state of your CSS to the golden screenshots, run:

```
node spec/visual-regression-tester.js test
```

If the current screenshots don't match their golden counterparts, you will
be directed to an HTML file that visually shows the differences between
any conflicting screenshots.

### Building

To build the `nasawds` package in preparation for releases, run:

```sh
npm run release
```

## Coding guidelines

The purpose of our coding styleguides are to create consistent coding practices across 18F. The styleguide should be treated as a guide — rules can be modified according to project needs.

This project follows the 18F Front End Guide [CSS](https://pages.18f.gov/frontend/#css) and [JavaScript](https://pages.18f.gov/frontend/#javascript). Please use this guide for your reference.

### Code coverage

We use [code coverage](https://en.wikipedia.org/wiki/Code_coverage) tools to understand how much of our JavaScript is tested by our [unit test suite](spec/unit). Code coverage is one way (among many) of measuring code _quality_ more generally. Here's how it works for contributions:

1. Each pull request creates a new coverage report on [Code Climate](https://codeclimate.com/).
1. Code Climate then posts a status message back to GitHub that lists the coverage percentage on that branch, and the difference between that number and the one last reported on our default branch.

For JavaScript contributions, we will review the code coverage percentage and change to ensure that the quality of our code is not dramatically affected.

High code coverage numbers are generally good, and we would prefer that our coverage increases over time. We will not categorically reject contributions that reduce code coverage, but we may ask contributors to refactor their code, add new unit tests, or modify existing tests to avoid significant reductions in coverage.

## Browser support
See [browser support](https://nasa.github.io/nasawds-site/getting-started/developers/#browser-support) in the “Getting started: Developers” guidelines.

## Our use of branches

See the [release documentation](RELEASE.md#release-process) for more information on our git/GitHub release workflow.

## Licenses and attribution

### A few parts of this project are not in the public domain

For complete attribution and licensing information for parts of the project that are not in the public domain, see the [LICENSE](LICENSE.md).

### The rest of this project is in the public domain

The rest of this project is in the worldwide [public domain](https://github.com/nasa/nasawds/blob/develop/LICENSE.md).

This project is in the public domain within the United States, and
copyright and related rights in the work worldwide are waived through
the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).

### Contributions will be released into the public domain

All contributions to this project will be released under the CC0
dedication. By submitting a pull request, you are agreeing to comply
with this waiver of copyright interest.

[Node.js]: https://nodejs.org
[Fractal]: http://fractal.build
[Gulp]: http://gulpjs.com/
[Yarn]: https://yarnpkg.com/
[eslint]: http://eslint.org/
[stylelint]: https://stylelint.io/


# Instructions

## Initialize

4. Clone [nasa/nasawds](https://github.com/nasa/nasawds) to your machine
5. Clone [nasa/nasawds-site](https://github.com/nasa/nasawds-site) to your machine
6. Open a bash terminal and `cd` to `nasawds`
6. Install standards: `yarn install`
6. `yarn link`
6. `cd` to `nasawds-site`
6. `bundle update jekyll-redirect-from`
6. `bundle install`
6. Install standards documentation: `yarn install`
6. `yarn link nasawds`

## Run

1. `cd` to `nasawds`
1. Start fractal server: `yarn run start`
1. Open a new terminal tab/window
1. `cd` to `nasawds-site`
1. Run standards documentation: `yarn run start`

## Track changes

1. Open another terminal window/tab
1. Run `watch` on standards: `cd nasawds` then `npm run watch`
1. Open another terminal window/tab
1. Run `watch` on docs: `cd nasawds-site` then `npm run watch`
1. That's It! Make changes to the standards or docs source files and the jekyll site running on http://127.0.0.1:4000/nasawds-site/ will be updated automatically. Just refresh your browser to see the changes.

## Delete a git tag

### Locally
`git tag -d v0.11.1`

### Remotely
`git push --delete origin v0.11.1`

## To batch change the color of .svg files
```
cd /path/to/nasawds/src/img
for f in *.svg; do sed -e 's/fill="#205493"/fill="#1d4893"/' -i "" "$f" ; done
for f in *.svg; do sed -e 's/fill="#0071bc"/fill="#105bd8"/' -i "" "$f" ; done
for f in *.svg; do sed -e 's/fill="#5b616b"/fill="#5b606b"/' -i "" "$f" ; done
```
