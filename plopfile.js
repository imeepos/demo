export default function (plop) {
  // React Component Generator
  plop.setGenerator('component', {
    description: 'Create a React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
        validate: input => {
          if (!input) return 'Component name is required';
          if (!/^[A-Z][a-zA-Z0-9]*$/.test(input)) {
            return 'Component name must be PascalCase';
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'withProps',
        message: 'Include props interface?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'withTest',
        message: 'Include test file?',
        default: true,
      },
    ],
    actions: data => {
      const actions = [
        {
          type: 'add',
          path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
          templateFile: 'plop-templates/component.hbs',
        },
        {
          type: 'add',
          path: 'src/components/{{pascalCase name}}/index.ts',
          templateFile: 'plop-templates/index.hbs',
        },
      ];

      if (data.withTest) {
        actions.push({
          type: 'add',
          path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
          templateFile: 'plop-templates/component.test.hbs',
        });
      }

      return actions;
    },
  });

  // Hook Generator
  plop.setGenerator('hook', {
    description: 'Create a custom React hook',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Hook name (without "use" prefix):',
        validate: input => {
          if (!input) return 'Hook name is required';
          if (!/^[a-z][a-zA-Z0-9]*$/.test(input)) {
            return 'Hook name must be camelCase';
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'withTest',
        message: 'Include test file?',
        default: true,
      },
    ],
    actions: data => {
      const actions = [
        {
          type: 'add',
          path: 'src/hooks/use{{pascalCase name}}.ts',
          templateFile: 'plop-templates/hook.hbs',
        },
      ];

      if (data.withTest) {
        actions.push({
          type: 'add',
          path: 'src/hooks/use{{pascalCase name}}.test.ts',
          templateFile: 'plop-templates/hook.test.hbs',
        });
      }

      return actions;
    },
  });

  // Utility Function Generator
  plop.setGenerator('util', {
    description: 'Create a utility function',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Utility function name:',
        validate: input => {
          if (!input) return 'Function name is required';
          if (!/^[a-z][a-zA-Z0-9]*$/.test(input)) {
            return 'Function name must be camelCase';
          }
          return true;
        },
      },
      {
        type: 'confirm',
        name: 'withTest',
        message: 'Include test file?',
        default: true,
      },
    ],
    actions: data => {
      const actions = [
        {
          type: 'add',
          path: 'src/utils/{{camelCase name}}.ts',
          templateFile: 'plop-templates/util.hbs',
        },
      ];

      if (data.withTest) {
        actions.push({
          type: 'add',
          path: 'src/utils/{{camelCase name}}.test.ts',
          templateFile: 'plop-templates/util.test.hbs',
        });
      }

      return actions;
    },
  });
}
