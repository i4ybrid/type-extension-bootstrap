/**
 *   C H A N G E    L O G
 *
 *  JIRA #       Date        Who                       Description
 *  ----------   ----------  ------------------------  ---------------------------------------------------------------
 *  PSO-         {{mm/yy/yyyy}}  {{userEmail}}
 **/

var expect = require('chai').expect;
let axus = require('axus');

let {{documentType.label}}1 = require('./resources/{{documentType.label}}1.json');

//------------------------------------------------------------------------------
let ctx = axus
  .requireLocal('../customer/{{customerKey}}/{{moduleName}}', undefined, {
    console: console,
  })
  .seed(require('./resources/seed.json'));

//TODO Change the texts below for tests
describe('Test Suite', () => {
  describe('Single Test', () => {
    it('Test something', (done) => {
      //These should always set to disable
      ctx.{{typeExtensionFunctionName}}({{documentType.label}}1);
      expect({{documentType.label}}1).is.not.undefined;
      done();
    });
  });
});
