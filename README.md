# decoded sequelize tutorial

Install Node and MySQL in your computer.

Clone the project repository by running the command below:

```bash
# using SSH
git clone git@github.com:derduskenga/decoded-sequelize-tutorial.git
# using HTTPS
git clone https://github.com/derduskenga/decoded-sequelize-tutorial.git
```
After cloning, run:

```bash
Run: npm install
```
create a .env file in project root directory and provide values of the following: 
```bash

    DB_USERNAME=
    DB_PASSWORD=
    DB_NAME=
    DB_HOST=
    API_PORT=
   ```
   
Run the following command to create your database tables
```bash

Run: npx sequelize-cli db:migrate;
```
Optionally, run the folowind command to add some fake tables to your database table. 

```bash 
npx sequelize-cli db:seed:all
```
