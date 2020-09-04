import { Transform } from 'jscodeshift';
import { addImportMember, curry } from '../src';

const transform: Transform = (fileInfo, { jscodeshift: j }) => {
  const root = j(fileInfo.source);

  const addImportMemberCurried = curry(addImportMember, j, root);

  addImportMemberCurried('module2', 'b');

  return root.toSource({
    arrowParensAlways: true,
    quote: 'single',
  });
};

export default transform;
export const parser = 'ts';
