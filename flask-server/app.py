import tensorflow as tf
import tensorflow_hub as hub
from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
import os
import numpy as np
from keras.models import load_model 
import subprocess
import shutil
from flask_cors import CORS, cross_origin
import time
from threading import Thread



tf.keras.utils.get_custom_objects()['KerasLayer'] = hub.KerasLayer
model = tf.keras.models.load_model('models/Keras_hub_large.h5')

app=Flask(__name__)
CORS(app)


app.config['SECRET_KEY'] = 'supersecretkey'
app.config['UPLOAD_FOLDER'] = 'static/files'


global featureFile 
featureFile = None




@app.route('/api/upload_file',  methods = ['POST'])
def upload_file():

	print("Da vao analysic_file")
	file = request.files['file']

	if 'file' not in request.files:
		return { "isCompleted": False, "conclusion": "File not found" }

	if file.filename == '':
		return { "isCompleted": False, "conclusion": "Filename error" }

	if file: 
		fileName =  ''.join(file.filename.split(".")[:-1])

		global featureFile
		featureFile = fileName + "-analysis.json"
		file.save(os.path.join(os.path.abspath(os.path.dirname(__file__)),app.config['UPLOAD_FOLDER'], secure_filename(file.filename)))

		return {"message": "Your file has been saved"}
		

@app.route('/api/run_extraction',  methods = ['GET'])
def run_extraction():

	# Run extraction
	def run_command():
		result = subprocess.run(['bash', os.path.join(app.root_path, 'AndroPyTool-Autorun', 'extraction.sh'), os.path.join(app.root_path,'static', 'files'), os.path.join(app.root_path,'reports') ])
	t1 = Thread(target=run_command)
	t1.start()

	
	return {"message": "Sucessfully extract file"}


@app.route('/api/analysic_result',  methods = ['GET'])
def analysic_result():
	
	feature_file_path = os.path.join(app.root_path, 'reports', 'Features_files', featureFile)
	
	# Use model to predict
	feature_file = open(feature_file_path, "r").read()
	x_train_BW = []
	x_train_BW.append(feature_file)
	prediction = model.predict(x_train_BW)  
	threshold = 2.549594
	binary_predictions = np.where(prediction[:, 0] > threshold, 1, 0)


	# Remove output folder for the next extraction
	shutil.rmtree(os.path.join(app.root_path, 'reports', 'DroidBox_outputs'))
	shutil.rmtree(os.path.join(app.root_path, 'reports', 'Dynamic'))
	shutil.rmtree(os.path.join(app.root_path, 'reports', 'Features_files'))
	shutil.rmtree(os.path.join(app.root_path, 'reports', 'FlowDroid_outputs'))
	shutil.rmtree(os.path.join(app.root_path, 'reports', 'FlowDroid_processed'))
	shutil.rmtree(os.path.join(app.root_path, 'reports', 'samples'))
	shutil.rmtree(os.path.join(app.root_path, 'reports', 'VT_analysis'))
	shutil.rmtree(os.path.join(app.root_path, 'reports', 'invalid_apks'))

	print("Gia tri du doan la: %d" %(binary_predictions))
	# Return JSON result
	if binary_predictions == 1:
		response = {
			"isCompleted": True,
			"conclusion": "malware"
		}
	else: 
		response = {
			"isCompleted": True,
			"conclusion": "benign"
		}

	return response

if __name__ == '__main__':
    app.run(debug=True)
