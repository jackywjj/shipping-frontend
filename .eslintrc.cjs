module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 1 : 0,
    //禁止修改const声明的变量
    'no-const-assign': 2,
    //switch中的case标签不能重复
    'no-duplicate-case': 2,
    //引号类型 `` "" ''
    'quotes': [1, 'single'],
    //禁止在条件中使用常量表达式 if(true) if(1)
    'no-constant-condition': 2,
    //在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-dupe-keys': 2,
    //禁止混用tab和空格
    'no-mixed-spaces-and-tabs': [2, false],
    //空行最多不能超过2行
    'no-multiple-empty-lines': [1, {'max': 1}],
    //一行结束后面不要有空格
    'no-trailing-spaces': 2,
    //不能有未定义的变量
    'no-undef': 0,
    //不能有声明后未被使用的变量或参数
    'no-unused-vars': 1,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // 类型定义any
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-vars': 1
  },
}
