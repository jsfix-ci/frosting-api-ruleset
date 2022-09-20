'use strict';

const {expect} = require('chai');
const inflectionCheck = require('../../../rules/ll/functions/inflection-check');


describe('inflection-check-function-tests', function () {


  describe('inflection path function type resource', function () {

    it('should error plural resource name with singular target type', function (done) {

      expect(inflectionCheck('/some/singular/paths', {type: '@resource-name',
        plural: false})).to.be.an('array');
      done();

    });

    it('should error singular resource name with plural target type', function (done) {

      expect(inflectionCheck('/some/singular/path', {type: '@resource-name',
        plural: true})).to.be.an('array');
      done();

    });

    it('should pass plural resource name check with plural target type', function (done) {

      expect(inflectionCheck('/some/singular/paths', {type: '@resource-name',
        plural: true})).to.not.be.an('array');
      done();

    });

    it('should pass singular resource name with singular target type', function (done) {

      expect(inflectionCheck('/some/singular/path', {type: '@resource-name',
        plural: false})).to.not.be.an('array');
      done();

    });

  });

  describe('inflection function options', function () {

    it('should error on invalid function type', function (done) {

      expect(inflectionCheck('/some/singular/paths', {type: '@invalid',
        plural: false})).to.be.an('array');
      done();

    });

  });

});
