from flask import Flask, request
from flask import send_from_directory
from flask import jsonify

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


#-----------------FUNCION CHIDA---------------
@app.route('/static/<path:filename>')
def download_file(filename):
    return send_from_directory('static', filename)


@app.route('/alison/<path:filename>')
def paginilla_alison(filename):
    return send_from_directory('alison', filename)

#guardadora en la BD
@app.route('/arduino/<int:value>')
def logging(value):
    cur = conn.cursor()
    cur.execute("INSERT into simple (valor) values ({});".format(value))
    conn.commit()
    return "dato posteado: {}".format(value)

#lectora de la BD
@app.route('/simple/')
def simple():
    cur = conn.cursor()
    cur.execute("SELECT * FROM simple;")
    lista = []
    for row in cur:
        dic = {}
        k = row[0]
        v = row[1]
        dic['id'] = k
        dic['valor'] = v
        lista.append(dic)
    return jsonify(lista)
    
#-----------------FIN FUNCION CHIDA---------------


@app.route('/post/<int:post_id>')
def integercillo(post_id):
    return "integercillo squared = {}".format(post_id**2)

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
