'use strict';


const {join} = require('path');
const {expect} = require('chai');
const {Spectral} = require('@stoplight/spectral');
const {Document, Parsers} = require('@stoplight/spectral');


const RULESET_FILE = join(__dirname, '../rules/jsonapi-document-structure-filtering.yaml');

describe('jsonapi-document-structure-filtering-ruleset', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  describe('filtering-keys-lower-case', function () {

    it('passes when filter keys are lower case', function (done) {

      const doc = new Document(`
        paths:
          /v1/leaflink/users:
            get:
              operationId: GET/v1/leaflink/users
              description: Fetch a list of Users
              parameters:
                - $ref: #/components/parameters/include
                - $ref: #/components/parameters/fields
                - $ref: #/components/parameters/sort
                - name: filter[email]
                  required: false
                  in: query
                  description: email
                  schema:
                    type: string
                - name: filter[search]
                  required: false
                  in: query
                  description: A search term.
                  schema:
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

  });

  describe('filtering-keys-lower-camel-case-with-dot-notation', function () {

    it('passes when filter keys are lower camel case and has dot notation with lookup field', function (done) {

      const doc = new Document(`
        openapi: 3.0.2
        paths:
          /path:
            get:
              parameters:
                - name: filter[orderName.iContains]
                  required: false
                  in: query
                  description: order name
                  schema:
                    type: string
                - name: filter[orderTotal.gte]
                  required: false
                  in: query
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

  });

  describe('filtering-keys-casing', function () {

    it('fails when filter keys are not the correct casing', function (done) {

      const doc = new Document(`
        paths:
          /v1/leaflink/users:
            get:
              operationId: GET/v1/leaflink/users
              description: Fetch a list of Users
              parameters:
                - $ref: #/components/parameters/include
                - $ref: #/components/parameters/fields
                - $ref: #/components/parameters/sort
                - name: filter[UPPERCASE]
                  required: false
                  in: query
                  description: email
                  schema:
                    type: string
                - name: filter[ProperCase]
                  required: false
                  in: query
                  description: A search term.
                  schema:
                    type: string

      `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          return spectral.run(doc);

        })
        .then((results) => {

          expect(results.length).to.equal(2);
          done();

        });

    });

  });

  describe('filtering-keys-non-alphabetical', function () {

    it('fails when filter keys are not alphabetical', function (done) {

      const doc = new Document(`
        paths:
          /v1/leaflink/users:
            get:
              operationId: GET/v1/leaflink/users
              description: Fetch a list of Users
              parameters:
                - $ref: #/components/parameters/include
                - $ref: #/components/parameters/fields
                - $ref: #/components/parameters/sort
                - name: filter[^%$&*]
                  required: false
                  in: query
                  description: email
                  schema:
                    type: string
                - name: filter[@#&@!)3]
                  required: false
                  in: query
                  description: A search term.
                  schema:
                    type: string

      `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          return spectral.run(doc);

        })
        .then((results) => {

          expect(results.length).to.equal(2);
          done();

        });

    });

  });

});
