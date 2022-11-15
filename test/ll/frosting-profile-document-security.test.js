'use strict';

const {join} = require('path');
const {expect} = require('chai');
const {Spectral} = require('@stoplight/spectral');
const {Document, Parsers} = require('@stoplight/spectral');


const RULESET_FILE = join(__dirname, '../../rules/ll/frosting-profile-document-security.yaml');


describe('frosting-profile-document-security ruleset', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  describe('contains-security-type-oidc', function () {

    it('fails when security does not contain oidc', function (done) {

      const doc = new Document(`
        openapi: 3.0.2
        paths:
          /path/names:
            get:
              security:
                - something-wrong
                  - read:athing
      `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          return spectral.run(doc);

        })
        .then((results) => {

            expect(results.length).to.equal(1);
            expect(results[0].code).to.equal('contains-security-type-oidc');

        });

    });

})

describe('ontains-one-scope', function () {

    it('fails when there is not at least one valid scope', function (done) {

      const doc = new Document(`
        openapi: 3.0.2
        paths:
          /path/names:
            get:
              security:
                - oidc
                  - thisscopeiswrong
      `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          return spectral.run(doc);

        })
        .then((results) => {

            expect(results.length).to.equal(1);
            expect(results[0].code).to.equal('ontains-one-scope');

        });

    });

})

});
