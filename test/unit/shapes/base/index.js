var expect = require('expect.js');
var shapesBase = require('../../../../shapes/base');
var CanvasObject = require('../../../../shapes/base/CanvasObject');
var RectangularCanvasObject = require('../../../../shapes/base/RectangularCanvasObject');
var EllipticalCanvasObject = require('../../../../shapes/base/EllipticalCanvasObject');

describe('shapes/base', function() {

  describe('.CanvasObject', function() {

    it('should be the CanvasObject class', function() {
      expect(shapesBase.CanvasObject).to.equal(CanvasObject);
      expect(shapesBase.CanvasObject).to.be.a('function');
    });

  });

  describe('.RectangularCanvasObject', function() {

    it('should be the RectangularCanvasObject class', function() {
      expect(shapesBase.RectangularCanvasObject).to.equal(RectangularCanvasObject);
      expect(shapesBase.RectangularCanvasObject).to.be.a('function');
    });

  });

  describe('.EllipticalCanvasObject', function() {

    it('should be the EllipticalCanvasObject class', function() {
      expect(shapesBase.EllipticalCanvasObject).to.equal(EllipticalCanvasObject);
      expect(shapesBase.EllipticalCanvasObject).to.be.a('function');
    });

  });

});