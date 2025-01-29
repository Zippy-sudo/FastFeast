from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, Customer, Order, Review, Item, Restaurant

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        Customer.query.delete()
        Order.query.delete()
        Review.query.delete()
        Item.query.delete()
        Restaurant.query.delete()

        #Add Customers
        C1 = Customer(name="Joe Davis")
        C2 = Customer(name="Louis Wincock")
        db.session.add_all([C1,C2])
        db.session.commit()

        #Add Restaurants
        R1 = Restaurant(name="KFC", location="Kimathi Street")
        R2 = Restaurant(name="Burger King", location="The Hub")
        db.session.add_all([R1, R2])
        db.session.commit()

        #Add Items
        I1 = Item(name="Cheeseburger", price=650, restaurant=R1)
        I2 = Item(name="Fries", price=500, restaurant=R1)
        I3 = Item(name="Chicken Strips", price=650, restaurant=R2)
        I4 = Item(name="Whopper", price=720, restaurant=R2)
        db.session.add_all([I1, I2, I3, I4])
        db.session.commit()

        #Add Reviews
        RV1 = Review(content="Very Good.", customer=C1, item=I1)
        RV2 = Review(content="Scrumptious.", customer=C2, item=I2)
        RV3 = Review(content="Delicious.", customer=C1, item=I3)
        RV4 = Review(content="Heavenly.", customer=C2, item=I4)
        db.session.add_all([RV1, RV2, RV3, RV4])
        db.session.commit()

        #Add Orders
        O1 = Order(amount=1, customer=C1, item=I1)
        O2 = Order(amount=2, customer=C2, item=I2)
        O3 = Order(amount=3, customer=C1, item=I3)
        O4 = Order(amount=4, customer=C2, item=I4)
        db.session.add_all([O1, O2, O3, O4])
        db.session.commit()