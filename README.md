# Cosmetic_Supply_Chain
The project is composed by 4 parts :
- Cosmetic Supply Chain Backend
- Machine Learning Models
- Cosmetic Supply Chain Web (Angular 16.1.6)
- Power bi Dashboard 

# Cosmetic Supply Chain Backend

This is the backend component of the **Cosmetic Supply Chain** project. It is built using **Flask** and serves as the main API provider for user management and predictive models related to distribution, inventory, procurement, and production.

## 🔧 Technologies Used

- **Flask** - Python web framework
- **MongoDB** - Used for storing user data
- **PyMongo** - MongoDB driver for Flask
- **JWT** - JSON Web Tokens for authentication
- **Machine Learning** - Scikit-learn models for prediction
- **Joblib** - For model serialization
- Make sure you have mongodb installed in your pc

## 📁 Project Structure

```
Cosmetic_Supply_Chain_backend/
│
├── api/
│   ├── Distribution/
│   │   ├── DistributionAPI.py
│   │   └── models/
│   ├── Inventory/
│   │   ├── InventoryAPI.py
│   │   └── models/
│   ├── Procurement/
│   │   ├── RecommendationSystem.py
│   │   ├── SupervisedClassification.py
│   │   ├── SupervisedRegression.py
│   │   └── TimeSeries.py
│   ├── Production/
│   │   ├── performtance_api.py
│   │   ├── productdelayedd_api.py
│   │   └── models/
│   └── UserAPI.py
│
├── config/
│   └── DatabaseConfig.py
│
├── dao/
│   └── UserDAO.py
│
├── models/
│   └── User.py
│
├── utils/
│   ├── JWT_token.py
│   └── Password_Hasher.py
│
├── main.py
└── requirements.txt
```

## 🧠 Machine Learning APIs

This backend integrates ML models trained during a training period, each serving a domain within the supply chain:

- **DistributionAPI** – Predicts real-time delivery hours.
- **InventoryAPI** – Monitors and forecasts stock level issues.
- **Procurement**:
  - Regression, classification, and time-series models for supplier delays.
  - A recommendation system for best supplier selection.
- **Production**:
  - Product delay prediction.
  - Defect rate performance analysis.

## 👥 User API

A complete user management system featuring:

- **Login / Register**
- **JWT Authentication**
- **CRUD Operations**
- **MongoDB** as the database

## 🔐 Authentication

- JWT is used for secure token-based authentication.
- Tokens are generated and validated via the `JWT_token.py` utility.

## 📦 Requirements

```
flask==2.3.2
flask-pymongo==2.3.0
pymongo==4.3.3
python-dotenv==1.0.0
flask-cors==4.0.0
PyJWT==2.7.0
werkzeug==2.3.4
python-jose==3.3.0
pandas
joblib
timedelta
LabelEncoder
sqlalchemy
flask_cors
jwt
```

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Cosmetic_Supply_Chain_backend.git
   cd Cosmetic_Supply_Chain_backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependency check Requirement

4. Run the app:
   ```bash
   python main.py
   ```



# 🧠 Machine Learning Models - Cosmetic Supply Chain

This section of the project includes **Jupyter Notebook (.ipynb)** files containing the training workflows for predictive models used by decision-makers across the cosmetic supply chain.

Each notebook is self-contained and includes:
- Data loading and preprocessing
- Model selection and training
- Evaluation and visualization
- Exporting trained models using `joblib`
- Dependency installation (handled within the notebook)

## 🧾 Decision-Maker Notebooks

We created **5 machine learning notebooks**, each corresponding to a key decision-making area in the supply chain:

| Decision-Maker | File | Objective |
|----------------|------|-----------|
| Procurement | `Procurement.ipynb` | Predict delivery delays, classify suppliers, forecast future risks, and recommend optimal suppliers. |
| Inventory (Warehouse) | `Inventory.ipynb` | Forecast stock shortages, analyze usage trends, and trigger inventory alerts. |
| Distribution | `Distribution.ipynb` | Predict real-time delivery hours and identify logistics bottlenecks. |
| Production | `Production.ipynb` | Predict manufacturing delays and detect defective production batches. |
| Equipment | `Equipment.ipynb` | Monitor equipment performance, forecast breakdowns, and reduce production downtime. *(Same decision-maker as Production)* |

## ⚙️ Notebooks & Architecture

Each notebook is structured with clearly defined sections:
1. **Introduction & Objective**
2. **Dependencies Installation**  
   > All necessary libraries (e.g., `pandas`, `scikit-learn`, `joblib`) are installed within each notebook.
3. **Data Ingestion & Cleaning**
4. **Feature Engineering**
5. **Modeling**
6. **Evaluation**
7. **Model Export (`joblib`)**


## Objective Used :
- Unsupervised Learning (Clustering) 
- Supervised Classification (Predicting Delivery Delays)
- Supervised Regression (Predicting Delay Days)
- Alternative for Time Series (Predicting Material Shortages)
- Recomendation System

These models are later used within the Flask APIs of the backend to support live predictions for decision-making.

## 📂 File Structure

```
Machine_Learning/
├── Procurement.ipynb
├── Inventory.ipynb
├── Distribution.ipynb
├── Production.ipynb
└── Equipment.ipynb
```

## 📤 Backend Integration

The exported models are loaded into the following backend modules:
- `api/Procurement/`
- `api/Inventory/`
- `api/Distribution/`
- `api/Production/`

They serve as prediction engines for the REST APIs developed using Flask.

## 🚀 How to Use

Simply open any `.ipynb` file in Jupyter Notebook or VSCode and execute all cells sequentially:

```bash
jupyter notebook Procurement.ipynb
```

Once executed, the trained model will be saved in `.pkl` format and ready for deployment within the corresponding Flask API route.

---

For any additional instructions or requirements, please refer to the code cells and comments included within each notebook.


# Cosmetic Supply Chain Web

This is the frontend application for the Cosmetic Supply Chain Management System, built with Angular v16.1.6. It provides interactive dashboards, machine learning prediction interfaces, and role-based access control for five decision-making entities. It also integrates Power BI dashboards for advanced visualization.

## 🚀 Project Overview
- Frontend Framework: Angular 16.1.6

- Visualization: Embedded Power BI dashboards

- Roles: Admin, Inventory, Procurement, Production, Distribution

- Default Credentials:

    **Email: admin@admin.com

    **Password: adminadmin

- The Admin role has full control and is responsible for creating user accounts with appropriate roles. Each role grants access to a specific set of visualizations and prediction tools.


## 📦 Installation & Setup
📌 Prerequisites: Make sure you have Node.js installed (preferably v16 or above).

# 1. Clone the repository
   git clone <your-repository-url>
   cd CosmeticSupplyChainWeb

# 2. Install dependencies (force flag recommended for Angular 16)
   npm install -g @angular/cli@16.1.6  (install angular first )
   npm install --force
    

# 3. Start the Angular development server
   ng serve
   Open your browser and navigate to:
    http://localhost:4200/

## 🧭 Project Structure
   src/
│
├── app/               
│   ├── dashboard/             # Dashboard layout
│   ├── Distribution/          # Distribution prediction components
│   ├── Procurement/           # Procurement prediction components
│   ├── Production/            # Production prediction components
│   ├── Warehouse/             # Inventory (Warehouse) prediction components
│   ├── Users/                 # User management
│   ├── services/              # API and utility services
│   └── model/                 # Interfaces and models
│
├── assets/                    # Static assets
├── environments/              # Environment configurations
└── theme/                     # navigationbar + topbar 
## 📊 Dashboard Integration
Power BI dashboards are embedded directly into relevant components, providing real-time insights into:

Procurement Metrics

Distribution Patterns

Inventory/Stock Levels

Production KPIs

These dashboards are rendered securely using Power BI’s JavaScript API and role-based access to control visibility.

## 🔐 Role-Based Access Control
Admin: Full control, user creation, dashboard and API access for all roles.

Inventory, Procurement, Production, Distribution:
Limited to their respective views and predictive insights.

Only the Admin can create new users and assign them to one of the available roles.


#