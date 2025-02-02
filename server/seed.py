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
        db.session.add(C1)
        db.session.commit()

        #Add Restaurants
        R1 = Restaurant(name="McDonald's", location="Blackheath, Guateng")
        R2 = Restaurant(name="Burger King", location="Two Rivers, Nairobi")
        R3 = Restaurant(name="Taco Bell", location="840 8th Ave, New York")
        R4 = Restaurant(name="Wendy's", location="85 Nassau St, New York")
        R5 = Restaurant(name="KFC", location="Westlands Square, Nairobi")
        R6 = Restaurant(name="Subway", location="Newark, Illinois")
        R7 = Restaurant(name="Pizza Hut", location="Westgate, Nairobi")
        R8 = Restaurant(name="Chick-fil-A", location="Igoji House, Nairobi")
        R9 = Restaurant(name="Jack in the Box", location="St.Louis, Missouri")
        R10 = Restaurant(name="Arby's", location="Lapeer, Michigan")
        db.session.add_all([R1, R2, R3, R4, R5, R6, R7, R8, R9, R10])
        db.session.commit()

        #Add Items
        I1 = Item(name="Big Mac", price=650, restaurant=R1)
        I2 = Item(name="Cheeseburger", price=170, restaurant=R1)
        I3 = Item(name="McChicken", price=390, restaurant=R1)
        I4 = Item(name="French Fries", price=250, restaurant=R1)
        I5 = Item(name="Whopper", price=710, restaurant=R2)
        I6 = Item(name="Cheeseburger", price=130, restaurant=R2)
        I7 = Item(name="Chicken Fries", price=460, restaurant=R2)
        I8 = Item(name="French Fries", price=240, restaurant=R2)
        I9 = Item(name="Crunchwrap Supreme", price=520, restaurant=R3)
        I10 = Item(name="Beef Soft Taco", price=240, restaurant=R3)
        I11 = Item(name="Baja Blast", price=330, restaurant=R3)
        I12 = Item(name="Cinnamon Twists", price=170, restaurant=R3)
        I13 = Item(name="French Fries", price=240, restaurant=R4)
        I14 = Item(name="Baconator", price=860, restaurant=R4)
        I15 = Item(name="Soft Drink", price=240, restaurant=R4)
        I16 = Item(name="Chicken Nuggets", price=590, restaurant=R4)
        I17 = Item(name="Biscuit", price=170, restaurant=R5)
        I18 = Item(name="Chicken Sandwich", price=520, restaurant=R5)
        I19 = Item(name="Popcorn Chicken", price=780, restaurant=R5)
        I20 = Item(name="Chicken Tenders", price=650, restaurant=R5)
        I21 = Item(name="Tuna Sandwich", price=690, restaurant=R6)
        I22 = Item(name="Chips", price=210, restaurant=R6)
        I23 = Item(name="Cookies", price=170, restaurant=R6)
        I24 = Item(name="Soft Drink", price=250, restaurant=R6)
        I25 = Item(name="Breadsticks", price=650, restaurant=R7)
        I26 = Item(name="Chicken Alfredo", price=1170, restaurant=R7)
        I27 = Item(name="Soft Drink", price=290, restaurant=R7)
        I28 = Item(name="Large Cheese Pizza", price=1300, restaurant=R7)
        I29 = Item(name="Chicken Sandwich", price=560, restaurant=R8)
        I30 = Item(name="Chicken Biscuit", price=420, restaurant=R8)
        I31 = Item(name="Soft Drink", price=260, restaurant=R8)
        I32 = Item(name="Chicken Nuggets", price=550, restaurant=R8)
        I33 = Item(name="Chicken Sandwich", price=620, restaurant=R9)
        I34 = Item(name="Soft Drink", price=240, restaurant=R9)
        I35 = Item(name="Curly Fries", price=330, restaurant=R9)
        I36 = Item(name="Bacon Cheeseburger", price=610, restaurant=R9)
        I37 = Item(name="French Fries", price=300, restaurant=R10)
        I38 = Item(name="Soft Drink", price=240, restaurant=R10)
        I39 = Item(name="Classic Chicken Sandwich", price=560, restaurant=R10)
        I40 = Item(name="Jamocha Shake", price=330, restaurant=R10)
        db.session.add_all([I1, I11, I12, I13, I14, I15, I16, I17, I18, I19, I2, I21, I22, I23, I24, I25, I26, I27, I28, I29, I3, I31, I32, I33, I34, I35, I36, I37, I38, I39, I4, I40, I10, I20, I30, I5, I6, I7, I8, I9])
        db.session.commit()

        #Add Reviews
        RV1 = Review(content="Very Good.", customer=C1, item=I1)
        RV2 = Review(content="Scrumptious.", customer=C1, item=I12)
        RV3 = Review(content="Delicious.", customer=C1, item=I23)
        RV4 = Review(content="Heavenly.", customer=C1, item=I4)
        db.session.add_all([RV1, RV2, RV3, RV4])
        db.session.commit()

        #Add Orders
        O1 = Order(amount=1, customer=C1, item=I1)
        O2 = Order(amount=2, customer=C1, item=I12)
        O3 = Order(amount=3, customer=C1, item=I23)
        O4 = Order(amount=4, customer=C1, item=I34)
        db.session.add_all([O1, O2, O3, O4])
        db.session.commit()