from flask import Flask , render_template,jsonify,request
from hand_data import get_hand_position
from lib import Leap
import pickle
import random
from classifier import clf
import numpy as np

app=Flask(__name__, template_folder='public', static_folder="static")

controller=Leap.Controller()
controller.set_policy(Leap.Controller.POLICY_BACKGROUND_FRAMES)

past_symbol = 'a'
prev_prediction = None

@app.route('/api')
def index():
	return render_template('index.html')


@app.route('/api/page1')
def page1():
	return render_template('page1/page1.html')


@app.route('/api/page2')
def page2():
	return render_template('page2/page2.html')


@app.route('/api/page3')
def page3():
	return render_template('page3/page3.html')

@app.route('/static/<path:path>')
def send_js(path):
    return send_from_directory('static', path)

@app.route('/currently')
def current_symbol():
	global past_symbol
	global prev_prediction

	#detect if there is a hand
	hand_pos=get_hand_position(controller)

	if not hand_pos:
		new=past_symbol !=' '
		past_symbol=' '
		return jsonify(symbol='bleh',new=new)
	features=np.array([v for k,v in hand_pos.iteritems()]).reshape(1,-1)

	prediction = ''.join(clf.predict(features))

	if prediction==prev_prediction:
		return jsonify(new=False,symbol=prediction)

	else:
		prev_prediction=prediction
		return jsonify(new=True,symbol=prediction)


if __name__=='__main__':
	app.run(debug=True)
