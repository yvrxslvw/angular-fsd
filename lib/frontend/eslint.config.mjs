import globals from 'globals';
import typescript from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';

export default [
	{
		languageOptions: {
			globals: {
				...globals.es2020,
				...globals.node,
				...globals.browser,
			},
			parser: typescript.parser,
			parserOptions: {
				project: ['./tsconfig.app.json', './tsconfig.json', './tsconfig.paths.json'],
				ecmaVersion: 2021,
				sourceType: 'module',
			},
		},
		plugins: {
			'import': importPlugin,
			'@typescript-eslint': typescript.plugin,
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: 'tsconfig.paths.json',
				},
			},
		},
		files: ['src/**/*.ts'],
		rules: {
			'semi': ['error'],
			'eqeqeq': ['error'],
			'no-var': ['error'],
			'eol-last': ['error'],
			'use-isnan': ['error'],
			'no-unused-vars': ['off'],
			'prefer-const': ['error'],
			'arrow-spacing': ['error'],
			'no-unreachable': ['error'],
			'no-multi-spaces': ['error'],
			'space-infix-ops': ['error'],
			'no-useless-catch': ['error'],
			'no-empty-pattern': ['error'],
			'no-param-reassign': ['error'],
			'no-unsafe-finally': ['error'],
			'no-unsafe-negation': ['error'],
			'no-unreachable-loop': ['error'],
			'no-loss-of-precision': ['error'],
			'no-constant-condition': ['error'],
			'no-useless-assignment': ['error'],
			'no-unexpected-multiline': ['error'],
			'func-style': ['error', 'expression'],
			'operator-linebreak': ['error', 'after'],
			'lines-between-class-members': [
				'error',
				{
					enforce: [
						{ blankLine: 'always', prev: 'field', next: 'method' },
						{ blankLine: 'always', prev: 'method', next: 'method' },
					],
				},
			],
			'no-unused-private-class-members': ['error'],
			'implicit-arrow-linebreak': ['error', 'beside'],
			'function-paren-newline': ['error', 'consistent'],
			'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
			'indent': [
				'error',
				'tab',
				{
					SwitchCase: 1,
					MemberExpression: 1,
					ArrayExpression: 1,
					ObjectExpression: 1,
					ImportDeclaration: 1,
					flatTernaryExpressions: true,
				},
			],

			'@typescript-eslint/return-await': ['error'],
			'@typescript-eslint/require-await': ['error'],
			'@typescript-eslint/await-thenable': ['error'],
			'@typescript-eslint/ban-ts-comment': ['error'],
			'@typescript-eslint/no-explicit-any': ['error'],
			'@typescript-eslint/no-unnecessary-type-assertion': ['error'],
			'@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
			'@typescript-eslint/member-ordering': [
				'error',
				{
					default: [
						'#private-field',
						'private-field',
						'public-field',
						'protected-field',
						'get',
						'set',
						'constructor',
						'public-method',
						'protected-method',
						'private-method',
						'#private-method',
					],
				},
			],

			'import/order': [
				'error',
				{
					'groups': ['builtin', 'external', 'internal'],
					'newlines-between': 'never',
					'alphabetize': {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
		},
	},
	prettierConfig,
];
