import { Transform } from 'jscodeshift';
import { curry, removeImportMember } from '../src';

const transform: Transform = (fileInfo, { jscodeshift: j }) => {
  const root = j(fileInfo.source);

  const removeImportMemberCurried = curry(removeImportMember, j, root);

  removeImportMemberCurried('module2', 'd');

  return root.toSource({
    arrowParensAlways: true,
    quote: 'single',
  });
};

export default transform;
export const parser = 'ts';
