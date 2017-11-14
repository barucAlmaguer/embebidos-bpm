from flask import Flask, request

import os
from urllib import parse
import psycopg2

parse.uses_netloc.append("postgres")
url = parse.urlparse(os.environ["DATABASE_URL"])

conn = psycopg2.connect(
    database=url.path[1:],
    user=url.username,
    password=url.password,
    host=url.hostname,
    port=url.port
)

app = Flask(__name__)

@app.route('/')
def index():
    return "Embebidos BMP"

@app.route('/post/<int:post_id>')
def integercillo(post_id):
    return "integercillo squared = {}".format(post_id**2)

@app.route('/Alison')
def funcionAlison():
    return "UVU"

#postear con formato:
#https://embebidos-bpm.herokuapp.com/upload?asdf=1&qwerty=2
@app.route('/upload', methods=['GET'])
def printVars():
    s = '{\n'
    for k, v in request.args.items():
        s += '  {}: {},'.format(k, v)
    s = s[:-1]
    s += '\n}'
    return s
