from flask import Flask
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure application to store JWTs in cookies. Whenever you make
# a request to a protected endpoint, you will need to send in the
# access or refresh JWT via a cookie.
app.config['JWT_TOKEN_LOCATION'] = ['cookies']

# Disable CSRF protection for this example. In almost every case,
# this is a bad idea. See examples/csrf_protection_with_cookies.py
# for how safely store JWTs in cookies
app.config['JWT_COOKIE_CSRF_PROTECT'] = False

# Set the secret key to sign the JWTs with
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this!

# db_username = os.getenv('DB_USER')
# db_pass = os.getenv('DB_PASS')
# db_name = os.getenv('DB_NAME')
# cloud_sql_connection_name = os.getenv('CLOUD_SQL_CONNECTION_NAME')

# database_uri = 'mysql+pymysql://' + db_name + ':' + db_pass + '@/' + db_name + '?unix_socket=/cloudsql/' + cloud_sql_connection_name
# app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

jwt = JWTManager(app)

from app import login, home, signup
from app.models import User