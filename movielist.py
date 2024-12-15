import pandas as pd

credits = pd.read_csv('tmdb_5000_credits.csv')

def movie_list():
    movie_list = credits.title.tolist()

    return movie_list