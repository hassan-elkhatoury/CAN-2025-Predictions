import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, RandomizedSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
import joblib
import os

PROCESSED_PATH = 'processed_data'
MODELS_PATH = 'models'
os.makedirs(MODELS_PATH, exist_ok=True)

def train():
    print("Loading dataset...")
    df = pd.read_csv(f'{PROCESSED_PATH}/final_dataset_for_modeling.csv')
    
    # Séparer les fonctionnalités et la cible
    X = df.drop(['result', 'match_id', 'date', 'team1', 'team2'], axis=1)
    y = df['result']
    
    # Division
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, stratify=y, random_state=42
    )
    
    # Pré-traitement
    print("Preprocessing data...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    
    label_encoder = LabelEncoder()
    y_train_encoded = label_encoder.fit_transform(y_train)
    
    # Optimisation (RandomizedSearchCV)
    print("Optimizing Random Forest...")
    rf = RandomForestClassifier(class_weight='balanced', random_state=42, n_jobs=-1)
    
    params = {
        'n_estimators': [100, 200],
        'max_depth': [5, 10, 15],
        'min_samples_split': [5, 10],
        'min_samples_leaf': [2, 5]
    }
    
    search = RandomizedSearchCV(rf, params, n_iter=10, cv=3, scoring='f1_macro', n_jobs=-1, random_state=42)
    search.fit(X_train_scaled, y_train_encoded)
    
    best_model = search.best_estimator_
    print(f"Best Score: {search.best_score_:.4f}")
    
    # Sauvegarde des artefacts
    print("Saving models...")
    joblib.dump(best_model, f'{MODELS_PATH}/rf_model.joblib')
    joblib.dump(scaler, f'{MODELS_PATH}/scaler.joblib')
    joblib.dump(label_encoder, f'{MODELS_PATH}/label_encoder.joblib')
    
    # Sauvegarder les noms des fonctionnalités pour l'inférence plus tard
    joblib.dump(X.columns.tolist(), f'{MODELS_PATH}/feature_names.joblib')
    
    print("✅ Training complete. Models saved in /models")

if __name__ == "__main__":
    train()