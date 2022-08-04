'use strict';

const {join} = require('path');
const {expect} = require('chai');
const {Spectral} = require('@stoplight/spectral');
const {Document, Parsers} = require('@stoplight/spectral');


const RULESET_FILE = join(__dirname, '../../rules/ll/jsonapi-document-structure-bad-request-ruleset.yaml');


describe('frosting-document-bad-request ruleset', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  describe('', function () {

    it('passes when paths have 400 and points to an errors object reference', function (done) {

      const doc = new Document(`
        openapi: 3.0.2
        paths:
          "/path":
            get:
              responses:
                '400':
                  content:
                    application/vnd.api+json:
                      schema:
                        $ref:  '#/components/schemas/failure'
                        type: string
        components:
          schemas:
            failure:
              type: object
              required:
              - errors
              properties:
                errors:
                  $ref: '#/components/schemas/errors'
            errors:
              type: object
              properties:
                id:
                  type: string
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
    it('fails when no 400 is supplied as part of the document', function (done) {

      const doc = new Document(`
        openapi: 3.0.2
        paths:
          /path:
            get:
              responses:
                '200':
                  description: get path
      `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          return spectral.run(doc);

        })
        .then((results) => {

          expect(results.length).to.equal(1);
          expect(results[0].code).to.equal('bad-request-responses');

          done();

        });

    });

    it('fails when the error object is not supplied', function (done) {

      const doc = new Document(`
        openapi: 3.0.2
        paths:
          /path:
            get:
              responses:
                '400':
                  content:
                    application/vnd.api+json:
                      schema:
                        type: string
                        $ref: 1
        components:
          schemas:
            success:
              type: object
              properties:
                id
      `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          return spectral.run(doc);

        })
        .then((results) => {
          
          expect(results.length).to.equal(1);
          expect(results[0].code).to.equal('bad-request-response-error-ref');
          done();

        });

    });

  });

});
