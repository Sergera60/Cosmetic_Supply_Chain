from app_extensions import db

class Order(db.Model):
    __tablename__ = 'Dim_Order'
    Id_Order_PK = db.Column(db.Integer, primary_key=True)
    OrderID = db.Column(db.String(100))
    Product_ID = db.Column(db.String(100))
    OrderDate = db.Column(db.DateTime)
    ShippingAddress = db.Column(db.String(50))
    Quantity = db.Column(db.String(100))
    Price_TND = db.Column(db.String(100))
