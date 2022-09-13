1. Install postgres from https://www.postgresql.org/download/ 
2. Create database e.g(my_database)
3. Create .env file in root directory, example(
    SECRET='randomsecret'
    DB_HOST='localhost'
    DB_PORT=5432
    DB_USERNAME='postgres'
    DB_PASSWORD='postgres'
    DB_NAME='my_database'
  )
4. In root directory run 'npm install'
5. In root directory run 'npm run start'
6. In browser open http://localhost:3000/api to see swager
