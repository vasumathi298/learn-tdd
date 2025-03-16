# JEST tutorial for test-driven development
Learn how to write unit tests and other kinds of tests

# Setup

Install dependencies

`$ npm install`

Run tests

`$ NODE_ENV=test npx jest /path/to/test/file`

Run coverage

`$ NODE_ENV=test npx jest --coverage /path/to/test/file`

View coverage report in `coverage/lcov-report/index.html`

The followung database scripts are not necessary. If you still need
them for manual testing here they are:

`$ npx ts-node insert_sample_data.ts "mongodb://127.0.0.1:27017/my_library_db"`

Clean the database

`npx ts-node remove_db.ts "mongodb://127.0.0.1:27017/my_library_db"`

# Description

This repository illustrates how to use jest to write unit tests 
for a server in typescript. The examples are as follows:

- `tests/authorSchema.test.ts`: Unit tests to verify the schema of the authors colletion. 
- `tests/bookDetailsService.test.ts`: Unit tests to verify the behavior of the service that is used to retrieve the details of a particular book.
- `tests/createBookService.test.ts`: Unit tests to verify if a book is created successfully.

# For you to do

## Part 1

Write a unit test for the GET /authors service. 
The service should respond with a list of author names and lifetimes sorted by family name of the authors. It should respond
with a "No authors found" message when there are no authors in the database. If an error occurs when retrieving the authors then the
service responds with an error code of 500. The unit test
should be placed in `tests/authorService.test.ts`.

## Part 2

Briefly explain a limitation of the tests in `tests/authorSchema.test.ts` in the space below.

One thing we can improve is how we verify sorting in our tests. Right now, we are relying on localeCompare, which directly ties our test to a specific implementation. If we ever tweak the sorting logic say, to make it case-insensitive or handle special characters differently, our test might break even if the functionality still works as expected. Instead, we should focus on testing the expected order of results rather than how they’re sorted internally.

Another gap in our testing is database interactions. We are mocking Author.getAllAuthors, which is great for isolating unit tests, but it does not actually confirm that our database integration works correctly. A separate set of integration tests would help ensure everything functions properly end-to-end.

Also, while we are using mocks, we are not verifying how they are called. For an instance, we mock Author.getAllAuthors, but we do not check if it is called with the right parameters. Adding Jest spies—like expect(mockFn).toHaveBeenCalledWith(...), would give us more confidence that our application is behaving as expected.

## Part 3

Generate the coverage report for the tests you wrote. How can you improve
your tests using the coverage report? Briefly explain your 
process in the space below.