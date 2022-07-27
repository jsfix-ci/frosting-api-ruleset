'use strict';

const {join} = require('path');
const {expect} = require('chai');
const {Spectral} = require('@stoplight/spectral');
const {Document, Parsers} = require('@stoplight/spectral');


const RULESET_FILE = join(__dirname, '../../rules/ll/jsonapi-document-structure-return-codes.yaml');


describe('frosting-profile-return-codes ruleset', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  describe('frosting-delete-return-codes', function () {

    it('passes when delete returns 204 and 404', function (done) {

      const doc = new Document(`
        openapi: 3.0.2
        paths:
          /somepath:
            delete:
              responses:
                '204':
                  content:
                    application/vnd.api+json:
                      schema:
                        type: object
                        required:
                        - data
                        properties:
                          data:
                            type: array
                            items:
                              type: integer
                '404':
                  content:
                    application/vnd.api+json:
                      schema:
                        type: object
                        required:
                        - data
                        properties:
                          data:
                            type: array
                            items:
                              type: integer
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

    it('passes when delete does not exist', function (done) {

      const doc = new Document(`
        openapi: 3.0.2
        paths:
          /somepath:
            get:
              responses:
                '200':
                  content:
                    application/vnd.api+json:
                      schema:
                        type: object
                        required:
                        - data
                        properties:
                          data:
                            type: array
                            items:
                              type: integer
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

    it('fails when delete does not return 204 or 404', function (done) {

      const doc = new Document(`
        openapi: 3.0.2
        paths:
          /somepath:
            delete:
              responses:
                '200':
                  content:
                    application/vnd.api+json:
                      schema:
                        type: object
                        required:
                        - data
                        properties:
                          data:
                            type: array
                            items:
                              type: integer
      `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          return spectral.run(doc);

        })
        .then((results) => {

          expect(results.length).to.equal(1);
          expect(results[0].code).to.equal('frosting-delete-return-codes');
          done();

        });

    });

  });

});
