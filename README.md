# Cafe Management
Employee management in the cafe

## How to Download and Set Up This App on Your Machine

### Backend Setup

1. Clone the repository:
   ```shell
   git clone https://github.com/ramesh918/cafe.git

2. Configure your database:
  - Go to `backend/config/config.json`.
  - Add your database credentials in the development object as shown below:
    ![Database Configuration](https://github.com/ramesh918/cafe/assets/92211837/75c5c160-f657-402f-b607-82fc94b84f2a)

4. Install all packages by running the command
   ```shell
   npm install
5. Perform database migration to create tables:
   ```shell
   npx sequelize-cli db:migrate

6. You should see an output like this:
   <img width="223" alt="image" src="https://github.com/ramesh918/cafe/assets/92211837/ca625de9-585c-4d3a-8f47-6af2748854c6">
8. Create simulated data by running the following commands:
     - ```shell
        npx sequelize-cli db:seed --seed seeders/seed-cafes.js
     - ```shell
        npx sequelize-cli db:seed --seed seeders/seed-employees.js
     - You should see an output like this:
     - <img width="324" alt="image" src="https://github.com/ramesh918/cafe/assets/92211837/371acac9-a372-48bb-8aa3-9b21beb34596">
9. Start the backend server:
    ```shell
       node app.js
### Frontend Setup
1. Change directory to frontend:
    ```shell
      cd frontend
2. Install frontend packages:
    ```shell
      npm install
3. Run the frontend application:
   ```shell
      npm run start

#### Tech Stack Used:
1. Node.js(18.12.1) 
2. MySQL(8.1.0)
3. Sequelize ORM
4. React.js with Redux-toolkit
5. Material UI

### Postman Collection
https://api.postman.com/collections/10865552-63fa3a17-52f9-47b6-b1d9-c642165521ad?access_key=PMAT-01HA6X599EQ5HSTPJE3AHBZDP2

