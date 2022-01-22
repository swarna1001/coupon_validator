## Coupon Validator

1. Python - 3.8.5
3. Node.js - 14.17.3
4. npm - 6.14.13
5. PostgreSQL - 12.9

### Local Repository Setup (For Windows)

1. Install the above mentioned softwares.
2. Install virtualenv python package using `pip install virtualenv`.
3. Install the dotenv package using `pip install python-dotenv`.
4. Create a virtual env `virtualenv (your virtual environment name)`.
5. Clone/Fork the repository.
6. Install python packages from the requirements.txt file using `pip install -r requirements.txt`.
7. Create a database server in PostgreSQL.
8. Edit database variables in .env file.
9. Install NPM packages from package.json using `npm install`.
10. Run the command `npm run build`.
11. Make database migrations using `python manage.py makemigrations` and `python manage.py migrate`.
12. Start the project using `python manage.py runserver`.
13. The project will run at your localhost.
