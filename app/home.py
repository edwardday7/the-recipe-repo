from flask import request, jsonify, render_template, redirect
from app import app, jwt
from flask_jwt_extended import (
    jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity, set_access_cookies,
    set_refresh_cookies, unset_jwt_cookies
)

@app.route('/', methods=['GET'])
@jwt_required
def home():
    username = get_jwt_identity()
    return render_template('home.html', username=username)

@jwt.unauthorized_loader
def invalid_redirect(callback):
    return redirect("http://localhost:5000/login", code=302)

@jwt.expired_token_loader
def expired_token(callback):
    return redirect("http://localhost:5000/login", code=302)

@jwt.invalid_token_loader
def invalid_token(callback):
    return redirect("http://localhost:5000/login", code=302)