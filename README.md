# frosting-spectral-jsonapi-ruleset

**Forked from https://github.com/jmlue42/spectral-jsonapi-ruleset/**

> A [Stoplight/Spectral](https://github.com/stoplightio/spectral) linting ruleset for the [JSON:API specification](https://jsonapi.org/format).

## Installation
For ways to integrate this ruleset into your Spectral linting suite. See [Sharing & Distributing Rulesets](https://meta.stoplight.io/docs/spectral/ZG9jOjI1MTky-sharing-and-distributing-rulesets#filesystem) at <https://meta.stoplight.io/>

### Steps

#### Fetch Ruleset
Add this ruleset as a git submodule in your project:

`git submodule add https://github.com/some-org/style-guide`

#### Add Spectal Config
Add a file called `.spectral.yml` to your project, it's contents are the following:

```yaml
extends:
  ./frosting-spectral-jsonapi-ruleset/jsonapi-ruleset.yaml
```

## Usage
Once installed, at the root of your project, run `spectral lint <PATH_TO_YOUR_OPENAPI_YAML>`

## Organization
Rules and Rulesets are organized by section of the JSON:API specification:
- Primary Ruleset
  - `./jsonapi-ruleset.yaml`
- Main Sections
  - `./rules/jsonapi-{name-of-section}-ruleset.yaml`
- Sub Sections
  - `./rules/jsonapi-{name-of-section}.yaml`

Each file `extends` rules/rulesets contained in its corresponding subsections.

## Contributing
In lieu of a formal style guide (I know... ironic :grin:):
- Take care to maintain the existing coding style, including tests.
- Add tests for all new/edited rules including JSONPath testing.
- Verify all linting and tests PASS: `npm test`

## License
[MIT License](https://github.com/jmlue42/spectral-jsonapi-ruleset/blob/main/LICENSE)
