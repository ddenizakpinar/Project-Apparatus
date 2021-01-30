from flask import Flask, escape, request
from flask_cors import CORS

app = Flask(__name__)
app.debug = True
CORS(app)

@app.route('/train', methods=['POST'])
def train():
    print(request.data)
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'