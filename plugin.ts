const plugin: Deno.lint.Plugin = {
  name: "use-nullish",
  rules: {
    "use-nullish": {
      create(context) {
        const sourceCode = context.sourceCode;
        // Recursively compares nodes, handling nested member expressions
        function nodesAreEquivalent(test: Deno.lint.ConditionalExpression["test"], consequent: Deno.lint.ConditionalExpression["consequent"]): boolean {
          if (test.type !== consequent.type) return false;
          switch (test.type) {
            case "Identifier":
              return test.name === (consequent as Deno.lint.Identifier).name;
            case "Literal":
              return test.value === (consequent as Deno.lint.Literal).value;
            case "MemberExpression": {
              const temp = consequent as Deno.lint.MemberExpression;
              return (
                test.computed === temp.computed &&
                nodesAreEquivalent(test.object, temp.object) &&
                nodesAreEquivalent(test.property as Deno.lint.Expression, temp.property as Deno.lint.Expression)
              );
            }
            default:
              return false;
          }
        }

        function report(node: Deno.lint.ConditionalExpression) {
          const { test, consequent, alternate } = node;

          if (nodesAreEquivalent(test, consequent)) {
            context.report({
              node,
              message: "Use nullish coalescing operator (??) instead of ternary expression",

              fix({ replaceText }) {
                const testText = sourceCode.getText(test);
                const alternateText = sourceCode.getText(alternate);

                return replaceText(node, `${testText} ?? ${alternateText}`);
              },
            });
          }
        }

        return {
          "ConditionalExpression[test.type='Identifier'][consequent.type='Identifier']": report,
          "ConditionalExpression[test.type='Literal'][consequent.type='Literal']": report,
          // For MemberExpressions, use a recursive check to handle nesting.
          "ConditionalExpression[test.type='MemberExpression'][consequent.type='MemberExpression']": (node) => {
            if (nodesAreEquivalent(node.test, node.consequent)) {
              report(node);
            }
          },
        };
      },
    },
  },
};

export default plugin;
