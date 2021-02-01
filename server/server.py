from flask import Flask, escape, request, send_file, send_from_directory, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn import svm
import pickle
import io
import gzip
import joblib
import jsonpickle
import json
from sklearn import metrics

app = Flask(__name__)
CORS(app)


@app.route('/train', methods=['POST'])
def train():
    file = request.files['file']
    form = request.form
    targetVariable, splitRatio, selectedDataHeaders, algorithm = form[
        'targetVariable'], form['splitRatio'], form['selectedDataHeaders'], form['algorithm']

    df = pd.read_csv(file)

    inc = [str(i) for i in selectedDataHeaders.split(",")]

    df_ = df[inc]

    categoricals = []
    for col, col_type in df_.dtypes.iteritems():
        if col_type == 'O':
            categoricals.append(col)
        else:
            df_[col].fillna(0, inplace=True)

    df_ohe = pd.get_dummies(df_, columns=categoricals, dummy_na=True)

    x = df_ohe[df_ohe.columns.difference([targetVariable])]
    y = df_ohe[targetVariable]

    X_train, X_test, y_train, y_test = train_test_split(
        x, y, train_size=int(splitRatio)/100, random_state=4)

    switcher = {
        1: LinearRegression(),
        2: LogisticRegression(),
        4: svm.SVC(kernel='linear')
    }

    model = switcher[int(algorithm)]
    model.fit(X_train, y_train)

    model_columns = list(x.columns)

    Y_pred = model.predict(X_test)

    score_model = round(model.score(X_test, y_test), 2)

    mae_model = round(metrics.mean_absolute_error(y_test, Y_pred), 4)
    mse_model = round(metrics.mean_squared_error(y_test, Y_pred), 4)

    mc = jsonpickle.encode(model_columns)
    jp = jsonpickle.encode(model)

    return jsonify({'model': jp, 'columns': mc, 'mae': mae_model, 'mse': mse_model, 'score': score_model})


@app.route('/predict', methods=['POST'])
def predict():

    model_file = request.form["model"]
    loaded_model = jsonpickle.decode(model_file)

    inputs = request.form["inputs"]
    load_inputs = json.loads(inputs)

    model_columns = request.form["columns"]
    load_model_columns = json.loads(model_columns)

    df = pd.DataFrame([load_inputs.values()], columns=load_inputs.keys())

    df2 = pd.get_dummies(df)
    merge = pd.concat([df, df2], axis=1)

    df = merge.reindex(columns=load_model_columns, fill_value=0)

    result = loaded_model.predict(df)

    return str(result[0])
