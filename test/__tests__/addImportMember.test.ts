jest.autoMockOff();

const { defineTest } = require('jscodeshift/dist/testUtils');

defineTest(__dirname, 'addImportMember-fixture1', null, 'addImportMember-fixture1', {
  parser: 'ts',
});

defineTest(__dirname, 'addImportMember-fixture2', null, 'addImportMember-fixture2', {
  parser: 'ts',
});

export {};
