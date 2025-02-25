export default {
	rules: {
		"useNullish": {
			meta: {
				type: "problem",
				docs: {
					description: "Use Nullish coalescing instead of ternary checks"
				},
				fixable: "code",
				schema: [],
				messages: {
					useNullishCoalescing: "Use nullish coalescing operator (??) instead of ternary expression"
				}
			},
			create(context) {
				const sourceCode = context.sourceCode;

				/**
				 * Checks if two AST nodes have the same structure and values
				 */
				function nodesAreEquivalent(node1, node2) {
				  if (!node1 || !node2) return false;
				  if (node1.type !== node2.type) return false;

				  switch (node1.type) {
					case 'Identifier':
					  return node1.name === node2.name;

					case 'MemberExpression':
					  return nodesAreEquivalent(node1.object, node2.object) &&
							 nodesAreEquivalent(node1.property, node2.property) &&
							 node1.computed === node2.computed;

					case 'Literal':
					  return node1.value === node2.value;

					// Add more cases as needed for other node types

					default:
					  return false;
				  }
				}

				return {
				  ConditionalExpression(node) {
					const { test, consequent } = node;

					if (nodesAreEquivalent(test, consequent)) {
					  context.report({
						node,
						messageId: "useNullishCoalescing",
						fix(fixer) {
						  const testText = sourceCode.getText(test);
						  const alternateText = sourceCode.getText(node.alternate);

						  return fixer.replaceText(
							node,
							`${testText} ?? ${alternateText}`
						  );
						}
					  });
					}
				  }
				};
			  }
		}
	}
};
