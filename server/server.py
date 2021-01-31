from flask import Flask, escape, request, send_file, send_from_directory, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle
import io
import gzip
import joblib
import jsonpickle
import json

app = Flask(__name__)
CORS(app)


@app.route('/train', methods=['POST'])
def train():
    file = request.files['file']
    form = request.form
    targetVariable, splitRatio = form['targetVariable'], form['splitRatio']

    df = pd.read_csv(file)
    X = df.drop(targetVariable, axis=1)
    y = df[targetVariable]
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, train_size=int(splitRatio)/100, random_state=4)

    model = LinearRegression(fit_intercept=True)
    model.fit(X_train, y_train)

    jp = jsonpickle.encode(model)
    return jsonify(jp)


@app.route('/predict', methods=['POST'])
def predict():
    model_file = request.form["model"]
    loaded_model = jsonpickle.decode(model_file)

    # with open('model (20).json', 'r') as file:
    #     loaded_model = jsonpickle.decode(str(file.read()))

    result = loaded_model.predict(
        [[1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 33, 3, 3]])
    print(result)
    return f'Hello'
