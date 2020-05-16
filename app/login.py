from flask import request, jsonify, render_template, redirect
from app import app, jwt
from flask_jwt_extended import (
    jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity, set_access_cookies,
    set_refresh_cookies, unset_jwt_cookies
)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.form:
        if request.form["username"] != "admin" or request.form["password"] != "admin":
            return jsonify({'error': 'Username or Password Incorrect'}), 403
        else:
            access_token = create_access_token(identity=request.form["username"])
            # Set the JWT cookies in the response
            resp = jsonify({'login': True})
            set_access_cookies(resp, access_token)
            return resp, 200
    else:
        return render_template('login.html')

@app.route('/logout', methods=['POST'])
def logout():
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return resp, 200

@jwt.user_claims_loader
def add_claims_to_access_token(identity):
    return {
        'email': 'edwardday7@gmail.com',
    }