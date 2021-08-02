# Project Name

Next.js Rails Authentication

## Author

Robert Garcia

## Purpose

Develop a solution for authentication in which a user has a unique username but an email may be asssociated to many usernames.

Login should allow user to input username or email.

## Proposed Solution

### Backend

In order to allow a user to sign in with either username or email I created an action called login in rails `/backend/app/controllers/session_controller`.

This action will use the user method which uses two parameters email_or_username and password. 

Those parameters are used in a query to locate records where the username/email and password match.

In the user method I convert the result into an array to keep it consistent if the user is using username or if only one account is tied to an email.

### Client

Utilizing Next.js framework I used React.js functional components I am able to conditionally handle the email and password combination returning multiple results while remaining on one view.

[Read about React.js functional components](https://reactjs.org/docs/hooks-state.html)

## Backend

Backend was developed using the following:

* ruby '2.7.2' - [Read more here](https://www.ruby-lang.org/en/documentation/)
* rails '~> 6.0.4' - [Read more here](https://rubyonrails.org/)

### Database

PostgreSQL was utilized for the database. - [Read more here](https://www.postgresql.org/)

### Environment Variables

Developer must add .env under `/backend` directory with their own variable values for:

* DEV_DB_USERNAME='INSERT_DEV_DB_USERNAME' - This is unique to developer.
* DEV_DB_PASSWORD='INSERT_DEV_DB_PASSWORD' - This is unique to developer.
* SECRET_KEY='cha11enge' - This can stay the same value.
* CLIENT_URL='http://localhost:3001' - This can stay the same value.

### Development Depencies
* bcrypt - used for encoding users passwords - [Read more here](https://github.com/bcrypt-ruby/bcrypt-ruby)
* jwt - used for tokens when generating sessions - [Read more here](https://github.com/jwt/ruby-jwt)
* dotenv - used for environment variables for PostgreSQL configuration - [Read more here](https://github.com/bkeepers/dotenv)

### Testing Dependencies
* rspec - for Rails api testing - [Read more here](https://github.com/rspec/rspec-rails)
* factory_bot_rails - factory to generate our test users - [Read more here](https://github.com/thoughtbot/factory_bot)
* faker - to create fake data for our user factory - [Read more here](https://github.com/faker-ruby/faker)
* database_cleaner - to ensure a clean state during tests - [Read more here](https://github.com/DatabaseCleaner/database_cleaner)

## Client

Client was developed using Next.js. - [Read more here](https://nextjs.org/docs/getting-started)

### Development Dependencies

* styled-components - provides a way to style react components without worrying about clashing classNames and other benefits - [Read more here](https://styled-components.com/docs/basics#getting-started)
* concurrently - allows developer to run multiple commands in one terminal - [Read more here](https://www.npmjs.com/package/concurrently#why)

## To Run Locally

1. `git clone https://github.com/Robert-Garcia552/nextjs_rails_auth.git`
2. `cd nextjs_rails_auth`
3. `yarn install` - will add dependency concurrently to run multiple scripts from root
4. `yarn install_apps` - will run `bundle install` in rails app and `yarn install` in client for all project dependencies
5. `yarn migrate` - will run `rails db:create db:migrate` in `/backend`
6. `yarn dev` in root directory will start the application, client is on http://localhost:3001 and rails server is on http://localhost:3000

## To Test Locally

Just run `yarn migrate_tests` it will run `rails db:create db:migrate` in `/backend` with RAILS_ENV=tests

To kick off the specs in root `yarn rails_tests`

Tests are located in `/backend/spec`

## Client ToDos

Expand styled-components to have Global Styles. Also, incorporate automated UI testing once another view is added.
