'use strict';


const {join} = require('path');
const {expect} = require('chai');
const {Spectral, Document, Parsers} = require('@stoplight/spectral');

const RULESET_FILE = join(__dirname, '../rules/jsonapi-crud-resource-allowed-methods-ruleset.yaml');

describe('jsonapi-crud-resource-allowed-methods-ruleset', function () {

  let spectral;

  beforeEach(function () {

    spectral = new Spectral();

  });

  describe('path-allowed-http-methods', function () {

    it('passes when the path has allowed http methods', function (done) {

      const doc = new Document(`
        openapi: 3.0.2
        paths:
          /path:
            get:
              responses:
                '200':
            patch:
              responses:
                '200':
            post:
              responses:
                '201':
            delete:
              responses:
                '204':
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

    it('fails when the path has a put http methods', function (done) {

      const doc = new Document(`
        openapi: 3.0.2
        paths:
          /path:
            put:
              responses:
                '200':
      `, Parsers.Yaml);

      spectral.loadRuleset(RULESET_FILE)
        .then(() => {

          return spectral.run(doc);

        })
        .then((results) => {

          expect(results.length).to.equal(1);
          done();
        
        });

    });

  });
  
});
