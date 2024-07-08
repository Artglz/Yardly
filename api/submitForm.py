# import os
# import re
# import requests
# from googlesearch import search
# from flask import Flask, request, jsonify

# app = Flask(__name__)

# def get_zillow_url(address):
#     query = f"{address} site:zillow.com"
#     for result in search(query, num_results=10):
#         if "zillow.com" in result:
#             return result
#     return None

# def extract_zpid(url):
#     match = re.search(r'/(\d+)_zpid/', url)
#     if match:
#         return match.group(1)
#     return None

# @app.route('/api-python/submitForm', methods=['POST'])
# def submit_form():
#     data = request.form
#     address = data.get('address')

#     # zillow_url = get_zillow_url(address)
#     # if not zillow_url:
#     #     return jsonify({'message': 'Zillow URL not found'}), 404
    
#     # zpid = extract_zpid(zillow_url)
#     # if not zpid:
#     #     return jsonify({'message': 'ZPID not found in URL'}), 404

#     # url = "https://zillow-com1.p.rapidapi.com/property"
#     # querystring = {"zpid": zpid}

#     # headers = {
#     #     "X-RapidAPI-Key": os.getenv('RAPIDAPI_KEY'),
#     #     "X-RapidAPI-Host": "zillow-com1.p.rapidapi.com"
#     # }

#     # response = requests.request("GET", url, headers=headers, params=querystring)
#     # property_details = response.json()
#     # square_footage = property_details.get("livingArea", "Square footage not available")

#     return jsonify({'square_footage': address})

# if __name__ == '__main__':
#     app.run()

from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/submitForm', methods=['GET'])
def get_data():
    data = {'message': 'Hello from Python!'}
    return jsonify(data)

if __name__ == '__main__':
    app.run()
