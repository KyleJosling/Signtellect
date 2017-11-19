from flask import Flask , render_template#, jsonify,request
#from hand_data import get_hand_position
#from lib import Leap
#import pickle
#import random


app=Flask(__name__, template_folder='public', static_folder="static")


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



if __name__=='__main__':
	app.run(debug=True)


