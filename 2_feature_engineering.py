import pandas as pd
import numpy as np
from datetime import datetime

PROCESSED_PATH = 'processed_data'

def calculate_last5_stats(df, team_col, date_col):
    stats = {}
    for idx, row in df.iterrows():
        team = row[team_col]
        match_date = row[date_col]
        
        past_matches = df[
            ((df['team1'] == team) | (df['team2'] == team)) &
            (df[date_col] < match_date)
        ].tail(5)
        
        if len(past_matches) == 0:
            stats[idx] = {'points': 7.5, 'goal_diff': 0}
            continue
            
        points = 0
        goal_diff = 0
        for _, match in past_matches.iterrows():
            if match['team1'] == team:
                points += 3 if match['result'] == 'W' else (1 if match['result'] == 'D' else 0)
                goal_diff += (match['home_score'] - match['away_score'])
            else:
                points += 3 if match['result'] == 'L' else (1 if match['result'] == 'D' else 0)
                goal_diff += (match['away_score'] - match['home_score'])
                
        stats[idx] = {'points': points, 'goal_diff': goal_diff / len(past_matches)}
    return stats

def calculate_h2h(df):
    h2h_stats = []
    for idx, row in df.iterrows():
        team1, team2, match_date = row['team1'], row['team2'], row['date']
        
        past = df[
            (((df['team1'] == team1) & (df['team2'] == team2)) |
             ((df['team1'] == team2) & (df['team2'] == team1))) &
            (df['date'] < match_date)
        ]
        
        total = len(past)
        if total == 0:
            h2h_stats.append({'total': 0, 'win_rate': 0.33})
            continue
            
        t1_wins = len(past[((past['team1'] == team1) & (past['result'] == 'W')) | 
                           ((past['team2'] == team1) & (past['result'] == 'L'))])
        
        h2h_stats.append({'total': total, 'win_rate': t1_wins / total})
    return h2h_stats

def main():
    print("Loading cleaned datasets...")
    df_african = pd.read_csv(f'{PROCESSED_PATH}/cleaned_african_football.csv')
    df_can = pd.read_csv(f'{PROCESSED_PATH}/cleaned_can_matches.csv')
    df_fifa = pd.read_csv(f'{PROCESSED_PATH}/cleaned_fifa_ranking.csv')
    df_team_stats = pd.read_csv(f'{PROCESSED_PATH}/cleaned_team_statistics.csv')
    df_champions = pd.read_csv(f'{PROCESSED_PATH}/cleaned_champions.csv')
    
    df_african['date'] = pd.to_datetime(df_african['date'])
    df_can['Date'] = pd.to_datetime(df_can['Date'])
    
    # Merge Logic (simplified from notebook)
    df_base = df_african.copy()
    # (Optional: Add unique CAN matches not in African Football DB here - skipped for brevity, 
    # assumes df_african is the master list)
    
    df_base = df_base.sort_values('date').reset_index(drop=True)
    
    # Basic Features
    df_base['match_id'] = range(1, len(df_base) + 1)
    df_base['team1'] = df_base['home_team']
    df_base['team2'] = df_base['away_team']
    
    # FIFA Ranking
    fifa_dict = dict(zip(df_fifa['country_full'], df_fifa['rank']))
    df_base['team1_fifa_rank'] = df_base['team1'].map(lambda x: fifa_dict.get(x, 100))
    df_base['team2_fifa_rank'] = df_base['team2'].map(lambda x: fifa_dict.get(x, 100))
    df_base['fifa_rank_diff'] = df_base['team1_fifa_rank'] - df_base['team2_fifa_rank']
    
    # Last 5 Matches
    print("Calculating Last 5 Matches stats...")
    t1_stats = calculate_last5_stats(df_base, 'team1', 'date')
    t2_stats = calculate_last5_stats(df_base, 'team2', 'date')
    
    df_base['team1_last5_points'] = df_base.index.map(lambda i: t1_stats[i]['points'])
    df_base['team2_last5_points'] = df_base.index.map(lambda i: t2_stats[i]['points'])
    df_base['team1_last5_goal_diff'] = df_base.index.map(lambda i: t1_stats[i]['goal_diff'])
    df_base['team2_last5_goal_diff'] = df_base.index.map(lambda i: t2_stats[i]['goal_diff'])
    
    # CAN Stats & Titles
    can_win_dict = dict(zip(df_team_stats['team'], df_team_stats['win_rate']))
    titles_dict = dict(zip(df_champions['team'], df_champions['can_titles']))
    
    df_base['team1_can_win_rate'] = df_base['team1'].map(lambda x: can_win_dict.get(x, 0.35))
    df_base['team2_can_win_rate'] = df_base['team2'].map(lambda x: can_win_dict.get(x, 0.35))
    df_base['team1_can_titles'] = df_base['team1'].map(lambda x: titles_dict.get(x, 0))
    df_base['team2_can_titles'] = df_base['team2'].map(lambda x: titles_dict.get(x, 0))
    
    # H2H
    print("Calculating Head-to-Head stats...")
    h2h_data = calculate_h2h(df_base)
    df_base['h2h_total_matches'] = [x['total'] for x in h2h_data]
    df_base['h2h_team1_win_rate'] = [x['win_rate'] for x in h2h_data]
    
    # Host & Context
    CAN_HOSTS = {2010:['Angola'], 2012:['Equatorial Guinea','Gabon'], 2013:['South Africa'],
                 2015:['Equatorial Guinea'], 2017:['Gabon'], 2019:['Egypt'],
                 2022:['Cameroon'], 2024:['Ivory Coast']}
    
    def is_host(team, year):
        if year in CAN_HOSTS: return team in CAN_HOSTS[year]
        return False

    df_base['team1_is_host'] = df_base.apply(lambda x: 1 if is_host(x['team1'], x['year']) else 0, axis=1)
    df_base['team2_is_host'] = df_base.apply(lambda x: 1 if is_host(x['team2'], x['year']) else 0, axis=1)
    
    # Stage (Group vs Knockout/Finals)
    if 'tournament' in df_base.columns:
        is_can = df_base['tournament'].str.contains('African Cup Of Nations|CAN', case=False, na=False)
        is_qualif = df_base['tournament'].str.contains('Qualif', case=False, na=False)
        df_base['stage_group'] = np.where(is_can & ~is_qualif, 1, 0)
    else:
        df_base['stage_group'] = 0

    # Days since last match (Simplified for speed)
    df_base['days_since_last_match_team1'] = 7 # Default
    df_base['days_since_last_match_team2'] = 7 # Default
    
    # Composite Features
    df_base['form_momentum_diff'] = df_base['team1_last5_goal_diff'] - df_base['team2_last5_goal_diff']
    df_base['can_performance_diff'] = df_base['team1_can_win_rate'] - df_base['team2_can_win_rate']
    df_base['h2h_dominance'] = df_base['h2h_team1_win_rate'] - 0.5
    df_base['titles_advantage'] = df_base['team1_can_titles'] - df_base['team2_can_titles']
    
    # Final Selection
    final_cols = [
        'match_id', 'date', 'team1', 'team2', 'fifa_rank_diff', 
        'team1_last5_points', 'team2_last5_points', 'team1_last5_goal_diff', 'team2_last5_goal_diff',
        'team1_can_win_rate', 'team2_can_win_rate', 'h2h_total_matches', 'h2h_team1_win_rate',
        'team1_is_host', 'team2_is_host', 'stage_group', 
        'days_since_last_match_team1', 'days_since_last_match_team2',
        'team1_can_titles', 'team2_can_titles',
        'form_momentum_diff', 'can_performance_diff', 'h2h_dominance', 'titles_advantage',
        'result'
    ]
    
    df_final = df_base[final_cols].copy()
    df_final.to_csv(f'{PROCESSED_PATH}/final_dataset_for_modeling.csv', index=False)
    print("✅ Feature engineering complete. Dataset saved.")

if __name__ == "__main__":
    main()