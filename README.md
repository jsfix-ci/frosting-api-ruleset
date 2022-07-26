# frosting-spectral-jsonapi-ruleset

**Forked from https://github.com/jmlue42/spectral-jsonapi-ruleset/**

> A [Stoplight/Spectral](https://github.com/stoplightio/spectral) linting ruleset for the [Frosting API specification](https://leaflink.atlassian.net/wiki/spaces/PLAT/pages/2434302607/Frosting+API+Specification+JSON+API+Profile).

## Overview

The Frosting API Specification is a [JSON:API Profile](https://jsonapi.org/recommendations/#authoring-profiles).
Essentially, it is a _more restrictive, but wholly compatible_ version of the JSON:API specification.

## Add To a Project

### Steps

#### Fetch Ruleset
Add this ruleset as a git submodule in your project:

```sh
git submodule add https://github.com/some-org/style-guide
```

#### Add Spectal Config
Create a file called `.spectral.yaml` in your project, include the following:
```yaml
extends:
  ./frosting-spectral-jsonapi-ruleset/frosting-ruleset.yaml
```

### Example
An example project is included in `./example`. The example includes a Frosting/JSON:API compat OpenAPI specification
called `frosting-example.yaml`. As well as an example Spectral config file called `.spectral.yaml`.

To use the example, `cd` into the `example` directory and run `spectral lint frosting-example.yaml`.

## Organization
General Organization:
- Forked Ruleset
  - `./rules`, root
  - We _should not_ be altering these files.
- LeafLink Ruleset
  - `./rules/ll`
  - Contains all custom rulesets added to this repo in addition to the original forked ruleset.

## Development

### Naming Conventions
All new rulesets should be contained in `./rules/ll`. When adding a new ruleset, there's some basic conventions
for file naming:

* If the rule was directly derived from the [Frosting API Specification document](https://leaflink.atlassian.net/wiki/spaces/PLAT/pages/2434302607/Frosting+API+Specification+JSON+API+Profile)
, then ruleset file names should begin with `frosting-profile-`.
* If the rule is directly derived from the [JSON:API Specification](https://jsonapi.org/) or the Frosting API
Specification references the JSON:API Specification, then ruleset file names should begin with `jsonapi-`.

These naming conventions exist to help us determine _where_ a rule came from at a glance.

---
---
> *Original forked README beyond this point!*
> Recommend reading for Installation and Organization.
---
---

# spectral-jsonapi-ruleset

![Node.js CI](https://github.com/jmlue42/spectral-jsonapi-ruleset/workflows/Node.js%20CI/badge.svg)
![CodeQL](https://github.com/jmlue42/spectral-jsonapi-ruleset/workflows/CodeQL/badge.svg)

> A [Stoplight/Spectral](https://github.com/stoplightio/spectral) linting ruleset for the [JSON:API specification](https://jsonapi.org/format).

## Installation
For ways to integrate this ruleset into your Spectral linting suite. See [Sharing & Distributing Rulesets](https://meta.stoplight.io/docs/spectral/docs/guides/7-sharing-rulesets.md) at <https://meta.stoplight.io/>

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

