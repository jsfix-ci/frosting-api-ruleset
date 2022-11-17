'use strict';

const {join} = require('path');
const {expect} = require('chai');
const {Spectral} = require('@stoplight/spectral');
const {Document, Parsers} = require('@stoplight/spectral');
const RULESET_FILE = join(__dirname, '../../rules/ll/frosting-responses-rate-limit.yaml');

describe('frosting-profile-document-path-resource-inflection-ruleset', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  describe('rate-limit-conventions', function () {

    it('All OK', function (done) {

      const doc = new Document(`
        openapi: 3.0.2
        paths:
          /path/names:
            get:
              responses:
                '429':
                  headers:
                    RateLimit-Limit:
                      schema:
                        type: integer
                    RateLimit-Remaining:
                      schema:
                        type: integer
                    RateLimit-Policy:
                      schema:
                        type: string
                    RateLimit-Reset:
                      schema:
                        type: string
                        format: date-time
                    Retry-After:
                      schema:
                        type: string
                '200':
                  headers:
                    Any-Header:
                      schema:
                        type: boolean
      `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          return spectral.run(doc);

        })
        .then((results) => {

          expect(results.length).to.equal(0);
          done();

        });

    });

    it('Failed due to no Retry-After', function (done) {

      const doc = new Document(`
        openapi: 3.0.2
        paths:
          /path/names:
            get:
              responses:
                '429':
                  headers:
                    RateLimit-Limit:
                      schema:
                        type: integer
                    RateLimit-Remaining:
                      schema:
                        type: integer
                    RateLimit-Policy:
                      schema:
                        type: string
                '200':
                  headers:
                    Any-Header:
                      schema:
                        type: bool
      `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          return spectral.run(doc);

        })
        .then((results) => {

          expect(results.length).to.equal(0);
          done();

        });

    });

  });

});
