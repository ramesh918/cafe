# cafe
employee management in cafe
## Backend 
#### Tech Stack Used:
1. Node.js(18.12.1) 
2. MySQL(8.1.0)
3. Sequelize ORM

### commands used
npm init
npm install sequelize mysql2 express cors joi uuid
npx sequelize-cli init
npx sequelize-cli model:generate --name Employee --attributes name:string
npx sequelize-cli model:generate --name Cafe --attributes name:string
npx sequelize-cli db:migrate
npx sequelize-cli db:seed --seed seeders/seed-cafes.js
npx sequelize-cli db:seed --seed seeders/seed-employees.js

### postman collection
https://api.postman.com/collections/10865552-63fa3a17-52f9-47b6-b1d9-c642165521ad?access_key=PMAT-01HA6X599EQ5HSTPJE3AHBZDP2
