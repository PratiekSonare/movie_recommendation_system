import requests
import pandas as pd
import concurrent.futures
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from model import model


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}}, supports_credentials=True)

credits = pd.read_csv('tmdb_5000_credits.csv')
favorites = []

# Your TMDb API key
TMDB_API_KEY = "ace4b980084957c1cfad114679f1367f"
TMDB_BASE_URL = "https://api.themoviedb.org/3"
POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500"

# Fetch movie details (including poster) from TMDb
def fetch_movie_details(movie_title):
    response = requests.get(f"{TMDB_BASE_URL}/search/movie", params={
        "api_key": TMDB_API_KEY,
        "query": movie_title
    })
    if response.status_code == 200:
        results = response.json().get("results", [])
        if results:
            movie = results[0]  # Take the first result
            poster_path = movie.get("poster_path")
            return {
                "title": movie["title"],
                "poster_path": f"{POSTER_BASE_URL}{poster_path}" if poster_path else None
            }
    return {"title": movie_title, "poster_path": None}

@app.route('/recommend', methods=['GET', 'POST'])
def recommend():
    if request.method == 'GET':
        
        movie_titles = [movie['title'] for movie in favorites]  # Extract titles from favorites
    else:
        movie_titles = request.get_json().get('movies', [])

    try:
        # Step 1: Get recommendations for each favorite movie
        all_recommended_movies = []
        for movie_title in movie_titles:
            recommended_movies = model(movie_title)
            recommended_movies = recommended_movies[:5]

            for movie in recommended_movies:
                details = fetch_movie_details(movie)
                all_recommended_movies.append(details)

        return jsonify(all_recommended_movies)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/movies', methods=['GET'])
def get_movies():
    try:
        movie_titles = credits['title'].tolist()[:150]

        # Use ThreadPoolExecutor to parallelize API calls
        with concurrent.futures.ThreadPoolExecutor() as executor:
            movies_with_posters = list(executor.map(fetch_movie_details, movie_titles))

        return jsonify(movies_with_posters)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/favorites', methods=['POST'])
def add_to_favorites():
    try:
        data = request.get_json()
        title = data.get('title')
        poster_path = data.get('poster_path')

        if not title:
            return jsonify([{'error': 'Title is required'}]), 400

        if {'title': title, 'poster_path': poster_path} not in favorites:
            favorites.append({'title': title, 'poster_path': poster_path})

        return jsonify({'message': 'Movie added to favorites'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/favorites', methods=['GET'])
def get_favorites():
    return jsonify(favorites), 200

@app.route('/favorites', methods=['DELETE'])
def remove_from_favorites():
    try:
        data = request.get_json()
        title = data.get('title')

        if not title:
            return jsonify({'error': 'Title is required to remove a favorite'}), 400

        global favorites
        favorites = [movie for movie in favorites if movie['title'] != title]

        return jsonify({'message': 'Movie removed from favorites'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
