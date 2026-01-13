# CAN 2025 Tournament Prediction System 🏆

A machine learning system that predicts the **Africa Cup of Nations 2025** tournament outcomes using historical match data and a Random Forest classifier.

## 📊 Key Predictions

**Predicted Champion:** Algérie (38.20% probability)

### Top 5 Teams
1. **Algérie** - 38.20% champion, 39.60% finalist
2. **Égypte** - 13.50% champion, 13.00% finalist
3. **Côte d'Ivoire** - 12.90% champion, 8.90% finalist
4. **Sénégal** - 12.60% champion, 13.70% finalist
5. **Maroc** - 11.00% champion, 11.20% finalist

## 🏗️ How It Works

**4-Step Pipeline:**

1. **Data Cleaning** (`1_data_cleaning.py`)
   - Processes 5 datasets with African football matches (2010-2024)
   - Normalizes team names and dates
   - Outputs cleaned data to `processed_data/`

2. **Feature Engineering** (`2_feature_engineering.py`)
   - Calculates: Last 5 matches stats, Head-to-Head records, FIFA rankings, CAN titles
   - Creates composite features (form momentum, H2H dominance, etc.)
   - Generates `final_dataset_for_modeling.csv`

3. **Model Training** (`3_train_model.py`)
   - Trains Random Forest classifier (100-200 trees, depth 5-15)
   - Hyperparameter optimization using RandomizedSearchCV
   - Saves model artifacts to `models/`

4. **Tournament Simulation** (`4_simulation_lib.py`)
   - Simulates 1000 tournament scenarios (Monte Carlo)
   - Predicts match winners with probabilities
   - Generates predictions and visualizations

## 🚀 Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Run the pipeline (in order)
python 1_data_cleaning.py
python 2_feature_engineering.py
python 3_train_model.py
python 4_simulation_lib.py
```

## 📁 Project Structure

```
PROJET/
├── 1_data_cleaning.py
├── 2_feature_engineering.py
├── 3_train_model.py
├── 4_simulation_lib.py
├── requirements.txt
├── raw_data/                    # Original CSV files
├── processed_data/              # Cleaned & engineered data
└── models/                      # Trained model artifacts
```

## 🎲 Model Details

- **Algorithm:** Random Forest Classifier
- **Classes:** Win (W), Draw (D), Loss (L)
- **Training Data:** ~500+ historical African football matches
- **Features:** 23 features including FIFA rankings, recent form, H2H records
- **Simulation:** 1000 Monte Carlo iterations per tournament prediction

## 📦 Dependencies

```
pandas
numpy
scikit-learn
joblib
matplotlib
seaborn
```

## 📝 Output

- **JSON:** Detailed simulation results with all match outcomes
- **PNG:** Visualization charts showing probability distributions
- **Probabilities:** Champion, finalist, and 3rd place predictions for all 16 teams

## 🎯 Participating Teams (CAN 2025)

Maroc, Sénégal, Égypte, Côte d'Ivoire, Nigeria, Tunisie, Algérie, Cameroun, Mali, Afrique du Sud, RD Congo, Burkina Faso, Bénin, Tanzanie, Mozambique, Soudan

---

**Last Updated:** January 12, 2026
