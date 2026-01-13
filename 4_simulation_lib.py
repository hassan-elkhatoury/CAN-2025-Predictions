import pandas as pd
import numpy as np
import joblib
from datetime import datetime

# Paths
MODELS_PATH = 'models'
PROCESSED_PATH = 'processed_data'

# Load artifacts (Global variables to load once)
try:
    model = joblib.load(f'{MODELS_PATH}/rf_model.joblib')
    scaler = joblib.load(f'{MODELS_PATH}/scaler.joblib')
    label_encoder = joblib.load(f'{MODELS_PATH}/label_encoder.joblib')
    feature_names = joblib.load(f'{MODELS_PATH}/feature_names.joblib')
    # Load historical data for dynamic feature calculation
    history_df = pd.read_csv(f'{PROCESSED_PATH}/final_dataset_for_modeling.csv')
    history_df['date'] = pd.to_datetime(history_df['date'])
except Exception as e:
    print(f"⚠️ Warning: Could not load models. Make sure you ran scripts 1-3. Error: {e}")

# Static Data for CAN 2025
FIFA_RANKING = {
    'Maroc': 13, 'Sénégal': 17, 'Égypte': 33, "Côte d'Ivoire": 39,
    'Nigeria': 44, 'Tunisie': 47, 'Algérie': 48, 'Cameroun': 49,
    'Mali': 51, 'Afrique du Sud': 57, 'RD Congo': 61, 'Burkina Faso': 75,
    'Bénin': 91, 'Tanzanie': 105, 'Mozambique': 108, 'Soudan': 123
}

CAN_TITLES = {
    'Égypte': 7, 'Cameroun': 5, 'Nigeria': 3, "Côte d'Ivoire": 3,
    'Algérie': 2, 'RD Congo': 2, 'Sénégal': 1, 'Tunisie': 1, 'Maroc': 1,
    'Afrique du Sud': 1, 'Soudan': 1, 'Mali': 0, 'Burkina Faso': 0, 
    'Bénin': 0, 'Tanzanie': 0, 'Mozambique': 0
}

HOST_COUNTRY = 'Maroc'
TEAM_NAME_MAPPING = {
    'Maroc': 'Morocco', 'Égypte': 'Egypt', "Côte d'Ivoire": 'Ivory Coast',
    'Afrique du Sud': 'South Africa', 'RD Congo': 'DR Congo',
    'Algérie': 'Algeria', 'Burkina Faso': 'Burkina Faso',
    'Tanzanie': 'Tanzania', 'Mozambique': 'Mozambique',
    'Mali': 'Mali', 'Tunisie': 'Tunisia',
    'Nigeria': 'Nigeria', 'Sénégal': 'Senegal',
    'Cameroun': 'Cameroon', 'Bénin': 'Benin', 'Soudan': 'Sudan'
}

def get_mapped_name(team):
    return TEAM_NAME_MAPPING.get(team, team)

def get_live_features(team1, team2):
    """Calculates features for two teams based on history + static data"""
    t1_map = get_mapped_name(team1)
    t2_map = get_mapped_name(team2)
    
    # 1. Recent Form (Last 5)
    def get_last5(t_name):
        matches = history_df[
            (history_df['team1'] == t_name) | (history_df['team2'] == t_name)
        ].sort_values('date', ascending=False).head(5)
        if matches.empty: return 7.5, 0
        
        pts, gd = 0, 0
        for _, m in matches.iterrows():
            if m['team1'] == t_name:
                pts += 3 if m['result'] == 'W' else (1 if m['result'] == 'D' else 0)
                gd += m['team1_last5_goal_diff'] # approximation
            else:
                pts += 3 if m['result'] == 'L' else (1 if m['result'] == 'D' else 0)
                gd += m['team2_last5_goal_diff']
        return pts, gd/len(matches)

    p1, gd1 = get_last5(t1_map)
    p2, gd2 = get_last5(t2_map)
    
    # 2. H2H
    h2h = history_df[
        ((history_df['team1'] == t1_map) & (history_df['team2'] == t2_map)) |
        ((history_df['team1'] == t2_map) & (history_df['team2'] == t1_map))
    ]
    h2h_total = len(h2h)
    if h2h_total > 0:
        t1_wins = len(h2h[((h2h['team1'] == t1_map) & (h2h['result'] == 'W')) | 
                          ((h2h['team2'] == t1_map) & (h2h['result'] == 'L'))])
        h2h_rate = t1_wins / h2h_total
    else:
        h2h_rate = 0.33

    # 3. CAN Win Rate (Approximation from static history)
    def get_can_rate(t_name):
        return 0.4 + (CAN_TITLES.get(team1, 0) * 0.05) # Simplified logic

    # Build Dict
    features = {
        'fifa_rank_diff': FIFA_RANKING.get(team1, 100) - FIFA_RANKING.get(team2, 100),
        'team1_last5_points': p1, 'team2_last5_points': p2,
        'team1_last5_goal_diff': gd1, 'team2_last5_goal_diff': gd2,
        'team1_can_win_rate': get_can_rate(t1_map), 'team2_can_win_rate': get_can_rate(t2_map),
        'h2h_total_matches': h2h_total, 'h2h_team1_win_rate': h2h_rate,
        'team1_is_host': 1 if team1 == HOST_COUNTRY else 0,
        'team2_is_host': 1 if team2 == HOST_COUNTRY else 0,
        'stage_group': 1, # Assumed tournament context
        'days_since_last_match_team1': 4,
        'days_since_last_match_team2': 4,
        'team1_can_titles': CAN_TITLES.get(team1, 0),
        'team2_can_titles': CAN_TITLES.get(team2, 0),
        'form_momentum_diff': p1 - p2,
        'can_performance_diff': 0, # Placeholder
        'h2h_dominance': h2h_rate - 0.5,
        'titles_advantage': CAN_TITLES.get(team1, 0) - CAN_TITLES.get(team2, 0)
    }
    
    # Ensure correct order
    return pd.DataFrame([features])[feature_names]

def predict_match(team1, team2):
    """Predicts winner between two teams"""
    X = get_live_features(team1, team2)
    X_scaled = scaler.transform(X)
    
    # Probabilities
    probs = model.predict_proba(X_scaled)[0]
    classes = label_encoder.classes_
    prob_dict = dict(zip(classes, probs))
    
    # Prediction
    pred_idx = np.argmax(probs)
    result = classes[pred_idx]
    
    if result == 'W': return team1, prob_dict
    elif result == 'L': return team2, prob_dict
    else: return 'Draw', prob_dict

def simulate_tournament():
    """Simulates the 2025 Bracket defined in the notebook"""
    bracket_16 = [
        ('Sénégal', 'Soudan'), ('Mali', 'Tunisie'),
        ('Maroc', 'Tanzanie'), ('Afrique du Sud', 'Cameroun'),
        ('Égypte', 'Bénin'), ('Nigeria', 'Mozambique'),
        ('Algérie', 'RD Congo'), ("Côte d'Ivoire", 'Burkina Faso')
    ]
    
    results = {}
    quarter_finalists = []
    
    print("--- Round of 16 ---")
    for t1, t2 in bracket_16:
        winner, _ = predict_match(t1, t2)
        # Force winner if Draw (simple logic for knockout)
        if winner == 'Draw': winner = t1 if FIFA_RANKING.get(t1, 100) < FIFA_RANKING.get(t2, 100) else t2
        quarter_finalists.append(winner)
        results[f"{t1} vs {t2}"] = winner
        
    return results, quarter_finalists

if __name__ == "__main__":
    # Test
    print("Test Prediction: Égypte vs Algérie")
    winner, probs = predict_match("Égypte", "Algérie")
    print(f"Winner: {winner}, Probs: {probs}")