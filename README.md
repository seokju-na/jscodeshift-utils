# jscodeshift utils

## Install

Add npm registry.

```shell
registry=https://npm.pkg.github.com/seokju-na
```

Install npm package.

```shell
npm install -D @seokju-na/jscodeshift-utils
yarn add --dev @seokju-na/jscodeshift-utils
```

## Usage

```typescript
import { Transform } from 'jscodeshift';
import * as util from '@seokju-na/jscodeshift-utils';

const transform: Transform = (fileInfo, { jscodeshift: j }) => {
  const root = j(fileInfo.source);
  
  const addImportMember = util.curry(util.addImportMember, j, root);
  const removeImportMember = util.curry(util.removeImportMember, j, root);
  
  addImportMember('react', 'useMemo');
  removeImportMember('react', 'useMemo');
  
  return root.toSource({
    arrowParensAlways: true,
    quote: 'single',
  });
};
```

## License
MIT Licensed
