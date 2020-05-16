FROM python:3.6-slim

ADD /app /app

WORKDIR /

RUN pip3 install flask gunicorn bcrypt flask-sqlalchemy pymysql

CMD exec gunicorn -b :$PORT -w 1 app:app