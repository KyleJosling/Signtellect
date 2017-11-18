from flask import Flask, render_template, jsonify,request
from hand_data import get_hand_position
from lib import Leap
import pickle
import random


app=Flask(__name__)

#controller=Leap.Controller()
#controller.set_policy(Leap.Controller.POLICY_BACKGROUND_FRAMES)


@app.route('/')
def current_symbol():
	global past_symbol
	global prev_prediction
	def hello():
    	return "Hello World!"

	#detect if there is a hand
	hand_pos=get_hand_position(controller)

	if not hand_pos:
		print "wtf"
		return jsonify(symbol='meh')
	features=[v for k,v in hand_pos.iteritems()]

	return jsonify(symbol=features)

if __name__=='__main__':
	app.run(debug=True)
