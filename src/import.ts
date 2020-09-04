import { Collection, ImportDeclaration, JSCodeshift } from 'jscodeshift';

export function findImportsByModuleName(
  j: JSCodeshift,
  collection: Collection,
  moduleName: string,
) {
  return collection.find(
    j.ImportDeclaration,
    (node: ImportDeclaration) =>
      node.type === 'ImportDeclaration' && node.source.value === moduleName,
  );
}

export function findImportsByMemberName(
  j: JSCodeshift,
  collection: Collection,
  memberName: string,
) {
  return collection.find(
    j.ImportDeclaration,
    (node: ImportDeclaration) =>
      node.type === 'ImportDeclaration' &&
      node.specifiers.some(
        (specifier) =>
          specifier.type === 'ImportSpecifier' && specifier.imported.name === memberName,
      ),
  );
}

export function insertImport(
  j: JSCodeshift,
  collection: Collection,
  moduleName: string,
  memberNames: string[],
) {
  const imports = collection.find(j.ImportDeclaration);

  imports.at(0).insertBefore(
    j.importDeclaration(
      memberNames.map((memberName) => j.importSpecifier(j.identifier(memberName))),
      j.literal(moduleName),
    ),
  );
}

export function addImportMember(
  j: JSCodeshift,
  collection: Collection,
  moduleName: string,
  memberName: string,
) {
  const ast = findImportsByModuleName(j, collection, moduleName).at(0);

  if (ast.length === 0) {
    insertImport(j, collection, moduleName, [memberName]);

    return;
  }

  const specifiers = ast.paths()[0].value.specifiers;
  const isMemberExists = specifiers.some(
    (specifier) => specifier.type === 'ImportSpecifier' && specifier.imported.name === memberName,
  );

  if (!isMemberExists) {
    ast.replaceWith(
      j.importDeclaration(
        [...specifiers, j.importSpecifier(j.identifier(memberName))],
        j.literal(moduleName),
      ),
    );
  }
}

export function removeImportMember(
  j: JSCodeshift,
  collection: Collection,
  moduleName: string,
  memberName: string,
) {
  const ast = findImportsByModuleName(j, collection, moduleName);

  if (ast.length === 0) {
    return;
  }

  const target = ast.paths()[0];
  let specifiers = target.value.specifiers;

  const index = specifiers.findIndex(
    (specifier) => specifier.type === 'ImportSpecifier' && specifier.imported.name === memberName,
  );

  if (index > -1) {
    specifiers = [...target.value.specifiers];
    specifiers.splice(index, 1);
  }

  if (specifiers.length === 0) {
    j(target).remove();
  } else {
    j(target).replaceWith(j.importDeclaration(specifiers, j.literal(moduleName)));
  }
}
