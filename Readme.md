Intial Configuration - 

1. Nodejs - version - 13.12.0
2. Mysqlworkbench - version - 8.0

Application setup -

1. Pull the code to local and run the cmd/git bash.
2. package.json is already mentioned and contains all the application modules.
	-- install them using "npm install" command.
3. To start the application.
	-- Entry point is "node server.js"

Knex setup and migration -

1. Here we are Knex module for database connection and migrations.
	-- Knex is mentioned in scripts of package.json
	-- We can use 'knex' cli commands
2. To create the Knex file i.e., knexfile.js.
	-- command "npm run knex init"
3. In knexfile.js mention the config of development, production and staging connections. Also the migrations are declared. (Note: Database name used in the application - 'users')
4. Now create a migration. In the application we have created migration for "user_table".
	-- command "npm run knex migrate:make user_table"
5. In /migrations folder the migration will be created with up and down methods.
	-- Add the method to createTable along with the schema of the table in up().
6. Lastly, run update migration to latest.
	-- command "npm run knex migrate:latest"


Application routes - 

1. http://localhost:8080/auth/signup - User Registration
	-- Method: POST
	-- Payload: {
					username:"",
					password:""
				}
2. http://localhost:8080/auth/login - User Login
	-- Method: POST
	-- Payload: {
					username:"",
					password:""
				}
3. http://localhost:8080/user/userlist - User List
	-- Method: GET
	-- Payload: Headers
				Authorization - bearer "token"

Validations used - 

1. Joi validation for routes signup and login.
	-- username - should have minimum 2 characters and should be required
	-- password - should have minimum 5 characters and should be required
2. Jwt token verification for userlist.
3. User validation along with encrypted password and generation of jwt token in login.
4. User find in database and if not exists then generation of jwt token in signup.

Errors codes - 

1. 200 - success
2. 404 - Not found (For request url)
3. 401 - Not authorized
5. 400 - Bad Request
4. 409 - User already exists(conflict)
5. 500 - Internal server error