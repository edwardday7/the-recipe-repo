import bcrypt
from flask import request, jsonify, render_template, redirect
from app import app, jwt
from app.models import User
from flask_jwt_extended import (
    jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity, set_access_cookies,
    set_refresh_cookies, unset_jwt_cookies
)


@app.route('/login', methods=['GET', 'POST'])
def login():

    if not request.form:
        return render_template('login.html')

    user = User.query.filter_by(username=request.form['username']).first()

    if user is None:
        return jsonify({'error': 'Username or Password Incorrect'}), 403

    if bcrypt.checkpw(request.form['password'].encode('utf-8'), user.password.encode('utf-8')):
        access_token = create_access_token(identity=user)
        # Set the JWT cookies in the response
        resp = jsonify({'login': True})
        set_access_cookies(resp, access_token)
        return resp, 200

    return jsonify({'error': 'Username or Password Incorrect'}), 403


@app.route('/logout', methods=['POST'])
def logout():
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return resp, 200

@jwt.user_claims_loader
def add_claims_to_access_token(user):
    return {
        'email': user.email,
        'username': user.username
    }

@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.user_id