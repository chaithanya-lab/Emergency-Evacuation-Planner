import pandas as pd
from sklearn.tree import DecisionTreeClassifier

data = pd.DataFrame({
    "smoke": [1, 2, 3, 4],
    "crowd": [1, 2, 3, 4],
    "safe": [1, 1, 0, 0]
})

X = data[["smoke", "crowd"]]
y = data["safe"]

model = DecisionTreeClassifier()
model.fit(X, y)

def predict(smoke, crowd):
    return model.predict([[smoke, crowd]])[0]