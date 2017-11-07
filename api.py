from flask import Flask

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
