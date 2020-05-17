import bcrypt
from flask import request, jsonify, render_template, redirect
from app import app, jwt, db
from app.models import User
from flask_jwt_extended import (
    jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity, set_access_cookies,
    set_refresh_cookies, unset_jwt_cookies
)


@app.route('/signup', methods=['GET', 'POST'])
def signup():

    if not request.form:
        return render_template('signup.html')

    password = bcrypt.hashpw(request.form['password'].encode('utf-8'), bcrypt.gensalt())

    user = User(username=request.form['username'], password=password.decode('utf-8'), email=request.form['email'])
    db.session.add(user)
    db.session.commit()

    access_token = create_access_token(identity=user)
    # Set the JWT cookies in the response
    resp = jsonify({'login': True})
    set_access_cookies(resp, access_token)
    return resp, 200

    return jsonify({'error': 'Failed to Create User!'}), 401

@jwt.user_claims_loader
def add_claims_to_access_token(user):
    return {
        'email': user.email,
        'username': user.username
    }

@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.user_id