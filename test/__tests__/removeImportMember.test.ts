jest.autoMockOff();

const { defineTest } = require('jscodeshift/dist/testUtils');

defineTest(__dirname, 'removeImportMember-fixture1', null, 'removeImportMember-fixture1', {
  parser: 'ts',
});

defineTest(__dirname, 'removeImportMember-fixture2', null, 'removeImportMember-fixture2', {
  parser: 'ts',
});

export {};
