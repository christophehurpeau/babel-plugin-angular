"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (babel) {

  var t = babel.types;
  var fromDecorators;
  var doInjection;
  var insertIndex;

  function addParam(node, name) {
    node.value.params.push({
      type: "Identifier",
      name: name
    });
  }

  function addStatement(node, name) {
    node.value.body.body.splice(insertIndex, 0, {
      type: "ExpressionStatement",
      expression: {
        operator: "=",
        type: "AssignmentExpression",
        left: {
          object: {
            type: "ThisExpression"
          },
          property: {
            name: name,
            type: "Identifier"
          },
          type: "MemberExpression"
        },
        right: {
          type: "Identifier",
          name: name
        }
      }
    });
    insertIndex++;
  }

  return new babel.Transformer("angular", {
    ClassDeclaration: function ClassDeclaration(node) {
      var i;
      var j;

      fromDecorators = [];
      doInjection = false;
      insertIndex = 0;

      if (!node.decorators) {
        return;
      }

      for (i = 0; i < node.decorators.length; i++) {
        var ex = node.decorators[i].expression;
        if (t.isCallExpression(ex) && t.isIdentifier(ex.callee, { name: "Inject" })) {
          doInjection = true;
          for (j = 0; j < ex.arguments.length; j++) {
            fromDecorators.push(ex.arguments[j].value);
            node.decorators.splice(j, 1);
          }
        }
      }
    },
    MethodDefinition: function MethodDefinition(node) {
      var i;

      if (!doInjection) return;
      if (t.isMethodDefinition(node, { kind: "constructor" })) {
        for (i = 0; i < fromDecorators.length; i++) {
          addStatement(node, fromDecorators[i]);
          addParam(node, fromDecorators[i]);
        }
      }
    }
  });
};

module.exports = exports["default"];

