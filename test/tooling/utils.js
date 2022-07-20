'use strict';

const {Document, Parsers} = require('@stoplight/spectral');

/**
 * get a YAML document.
 *
 * @param {String} key A key name for some property within a properties attribute of the document.
 * @return {Document} The document.
 */
const getDocument = (key) => {

  return new Document(`
    openapi: 3.0.2
    paths:
      /some_path:
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
                      ${key}:
                        type: array
                        items:
                          $ref: '#/components/schemas/User'
    components:
      schemas:
        User:
          type: object
          required:
          - type
          - id
          additionalProperties: false
          properties:
            attributes:
              type: object
              properties:
                id:
                  type: integer
                  readOnly: true
                email:
                  type: string
                  format: email
                  maxLength: 255
                firstName:
                  type: string
                  maxLength: 30
                lastName:
                  type: string
                  maxLength: 30
                dateJoined:
                  type: string
                  format: date-time
              required:
              - email
    `, Parsers.Yaml);

};

exports.getDocument = getDocument;
