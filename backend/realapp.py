from flask import Flask, render_template, jsonify,request
from hand_data import get_hand_position
from lib import Leap
import pickle
import random
import numpy as np
from classifier import clf


app=Flask(__name__)

controller=Leap.Controller()
controller.set_policy(Leap.Controller.POLICY_BACKGROUND_FRAMES)

past_symbol = 'a'
prev_prediction = None


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
