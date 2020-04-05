require(`dotenv-defaults`).config({
  path: './.env.test',
  encoding: 'utf8',
})

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "~(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
}
