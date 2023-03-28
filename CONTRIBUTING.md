Please see the [Contributing to Karma] guide for information on contributing to this project.

[Contributing to Karma]: https://github.com/karma-runner/karma/blob/master/CONTRIBUTING.md

# Pull Requests

Before filing a PR, ensure that:

* [ ] Tests pass.
* [ ] Linting passes.
* [ ] Commit linting passes.

See more details in each subsection below.

## Testing

To run unit tests execute:

```bash
npm run unit-test
```

To run integration tests execute:

```bash
npm run integration-test
```

Tip: you can run both unit and integration tests in a single step via: `npm test`.

## Linting

To lint your contribution execute:

```bash
npm run lint
```

There are some lint problems that can be auto-fixed for you. Try the following command to trigger auto-fix:

```bash
npm run lint --fix
```

## Commit Linting

We enforce [Angular's Commit Message Format] in our commit history. To verify that your commits are syntactically correct, execute:

```bash
npm run commitlint -- \
  --verbose \
  --from `git merge-base origin/master HEAD`
```

[Angular's Commit Message Format]: https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit