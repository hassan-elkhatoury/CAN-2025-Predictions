import pandas as pd
import numpy as np
from datetime import datetime
import re
import os

# Create directories if they don't exist
os.makedirs('processed_data', exist_ok=True)

# Configuration for paths
RAW_PATH = 'raw_data'
PROCESSED_PATH = 'processed_data'

def normalize_team_name(name):
    """Normalizes team names: strip, title case"""
    if pd.isna(name):
        return name
    return name.strip().title()

def clean_african_football():
    print("Cleaning: African National Football...")
    df = pd.read_csv(f'{RAW_PATH}/African national football from 2010-2024.csv')
    
    # Date conversion
    df['date'] = pd.to_datetime(df['date'], format='%m/%d/%Y')
    df['year'] = df['date'].dt.year
    df['month'] = df['date'].dt.month
    
    # Normalize names
    df['home_team'] = df['home_team'].apply(normalize_team_name)
    df['away_team'] = df['away_team'].apply(normalize_team_name)
    
    # Drop matches without scores
    df = df.dropna(subset=['home_score', 'away_score'])
    
    # Create result column
    def get_result(row):
        if row['home_score'] > row['away_score']: return 'W'
        elif row['home_score'] < row['away_score']: return 'L'
        else: return 'D'
    
    df['result'] = df.apply(get_result, axis=1)
    df.to_csv(f'{PROCESSED_PATH}/cleaned_african_football.csv', index=False)

def clean_can_matches():
    print("Cleaning: CAN Matches...")
    df = pd.read_csv(f'{RAW_PATH}/Africa Cup of Nations Matches.csv')
    df.columns = df.columns.str.strip()
    
    # Date parsing
    def parse_can_date(date_str):
        if pd.isna(date_str): return None
        try: return pd.to_datetime(date_str, format='%d-%b-%y')
        except: return None
        
    df['Date'] = df['Date'].apply(parse_can_date)
    df['year'] = df['Year']
    
    # Normalize names
    df['HomeTeam'] = df['HomeTeam'].apply(normalize_team_name)
    df['AwayTeam'] = df['AwayTeam'].apply(normalize_team_name)
    
    # Remove penalty wins from result logic (optional based on notebook)
    df['is_penalty_shootout'] = df['SpecialWinConditions'].fillna('').str.contains('win on penalties|win after penalties', case=False, na=False)
    df = df[~df['is_penalty_shootout']].copy()
    
    # Dropna and create result
    df = df.dropna(subset=['HomeTeamGoals', 'AwayTeamGoals'])
    
    def get_can_result(row):
        if row['HomeTeamGoals'] > row['AwayTeamGoals']: return 'W'
        elif row['HomeTeamGoals'] < row['AwayTeamGoals']: return 'L'
        else: return 'D'
        
    df['result'] = df.apply(get_can_result, axis=1)
    
    # Rename columns
    df = df.rename(columns={
        'HomeTeam': 'home_team', 'AwayTeam': 'away_team',
        'HomeTeamGoals': 'home_score', 'AwayTeamGoals': 'away_score',
        'Stage': 'stage'
    })
    df.to_csv(f'{PROCESSED_PATH}/cleaned_can_matches.csv', index=False)

def clean_fifa_ranking():
    print("Cleaning: FIFA Ranking...")
    df = pd.read_csv(f'{RAW_PATH}/fifa_ranking-2024-06-20.csv')
    df['rank_date'] = pd.to_datetime(df['rank_date'])
    
    # Filter Africa
    df_africa = df[df['confederation'] == 'CAF'].copy()
    df_africa['country_full'] = df_africa['country_full'].apply(normalize_team_name)
    
    # Keep latest
    df_africa = df_africa.sort_values('rank_date', ascending=False)
    df_latest = df_africa.groupby('country_full').first().reset_index()
    
    df_latest.to_csv(f'{PROCESSED_PATH}/cleaned_fifa_ranking.csv', index=False)

def clean_team_stats():
    print("Cleaning: General Stats...")
    df = pd.read_csv(f'{RAW_PATH}/General Statistics For each Participated Team.csv')
    
    def clean_name(name):
        if pd.isna(name): return name
        name = re.sub(r'\s*\[n \d+\]', '', name)
        return normalize_team_name(name)
        
    df['Team'] = df['Team'].apply(clean_name)
    
    # Convert GD
    def convert_gd(gd_str):
        if pd.isna(gd_str): return 0
        gd_str = str(gd_str).replace('+', '').replace('−', '-').replace('–', '-')
        try: return int(gd_str)
        except: return 0
        
    df['GD'] = df['GD'].apply(convert_gd)
    df['win_rate'] = df['W'] / df['Pld']
    
    # Rename
    df = df.rename(columns={'Team': 'team', 'Pld': 'games_played', 'GD': 'goal_difference'})
    df.to_csv(f'{PROCESSED_PATH}/cleaned_team_statistics.csv', index=False)

def clean_champions():
    print("Cleaning: Champions...")
    df = pd.read_csv(f'{RAW_PATH}/Champions.csv')
    df['Champion'] = df['Champion'].apply(normalize_team_name)
    titles_count = df['Champion'].value_counts().to_dict()
    
    df_clean = pd.DataFrame([
        {'team': team, 'can_titles': count} for team, count in titles_count.items()
    ])
    df_clean.to_csv(f'{PROCESSED_PATH}/cleaned_champions.csv', index=False)

if __name__ == "__main__":
    clean_african_football()
    clean_can_matches()
    clean_fifa_ranking()
    clean_team_stats()
    clean_champions()
    print("✅ Data cleaning complete.")