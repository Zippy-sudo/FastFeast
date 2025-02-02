from sqlalchemy_serializer import SerializerMixin

from config import db

class Customer(db.Model, SerializerMixin):
    __tablename__ = "customers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    orders = db.relationship("Order", back_populates="customer", cascade="all,delete-orphan")
    reviews = db.relationship("Review", back_populates="customer", cascade="all,delete-orphan")

    serialize_rules = ('-orders.customer', '-reviews.customer')
    
    def __repr__(self):
        return f"<Name:{self.name}>"
    
class Review(db.Model, SerializerMixin):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)

    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"))
    item_id = db.Column(db.Integer, db.ForeignKey("items.id"))

    customer = db.relationship("Customer", back_populates="reviews")
    item = db.relationship("Item", back_populates="reviews")

    serialize_rules = ('-customer.orders', '-customer.reviews', '-item.orders', 'item.reviews')

    def __repr__(self):
        return f"<Customer:{self.customer}, Item:{self.item}, Content:{self.content}>"

class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer, nullable=False)

    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"))
    item_id = db.Column(db.Integer, db.ForeignKey("items.id"))

    customer = db.relationship("Customer", back_populates="orders")
    item = db.relationship("Item", back_populates="orders")

    serialize_rules = ('-customer.orders', '-item.orders', '-item.reviews')

    def __repr__(self):
        return f"<Customer:{self.customer}, Item:{self.item}, Amount:{self.amount}>"

class Item(db.Model, SerializerMixin):
    __tablename__ = "items"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)

    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.id"))

    restaurant = db.relationship("Restaurant", back_populates="items")
    orders = db.relationship("Order", back_populates="item", cascade="all,delete-orphan")
    reviews = db.relationship("Review", back_populates="item", cascade="all,delete-orphan")

    serialize_rules = ('-restaurant.items', '-orders.item', '-reviews.item')

    def __repr__(self):
        return f"<Item:{self.name}, Item price:{self.price}, Item Restaurant:{self.restaurant}>"

class Restaurant(db.Model, SerializerMixin):
    __tablename__ = "restaurants"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)

    items = db.relationship("Item", back_populates="restaurant", cascade = "all,delete-orphan")

    serialize_rules = ('-items.restaurant', '-items.orders', '-items.reviews')

    def __repr__(self):
        return f"<Restaurant:{self.name}, Restaurant location:{self.location}"