from flask import Flask
from flask_jwt_extended import JWTManager

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

jwt = JWTManager(app)

from app import login, home