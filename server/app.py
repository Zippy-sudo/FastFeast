#!usr/bin/env python3

from flask import request, jsonify, make_response
from flask_restful import Resource
from models import Customer, Review, Order, Item, Restaurant

from config import app, db, api

@app.route('/')
def main():
    return '<h1>Welcome to FastFeast</h1>'

class Customers(Resource):

    def get(self):
        customers = Customer.query.all()

        if len(customers) > 0:
            customers_dict = [customer.to_dict() for customer in customers]
            response = make_response(customers_dict, 200)
            return response
        else:
            return make_response({"Error": "No Customers in Database"}, 404)
    
    def post(self):
        new_customer_data = request.get_json()
        new_customer = Customer(name=new_customer_data.get("name"))
        db.session.add(new_customer)
        db.session.commit()

        response = make_response(new_customer.to_dict(), 201)
        return response
    
api.add_resource(Customers, '/customers')

class CustomerById(Resource):

    def get(self, id):
        customer = Customer.query.filter_by(id = id).first()

        if customer:
            response = make_response(customer.to_dict(), 200)
            return response
        else:
            return make_response({"Error":"No such customer"}, 404)
    
    def patch(self, id):
        customer = Customer.query.filter_by(id = id).first()
        
        if customer:

            for attr in request.get_json():
                setattr(customer, attr, request.get_json()[attr])

            db.session.add(customer)
            db.session.commit()

            response = make_response(customer.to_dict(), 200)
            return response
        else:
            return make_response({"Error": "No such customer"}, 404)
        
    def delete(self, id):
        customer = Customer.query.filter_by(id = id).first()

        if customer:
            db.session.delete(customer)
            db.session.commit()
            
            response = make_response({},204)
            return response
        else:
            return make_response({"Error": "No such customer"}, 404)
        
api.add_resource(CustomerById, '/customers/<int:id>')

class Restaurants(Resource):

    def get(self):
        restaurants = Restaurant.query.all()

        if len(restaurants) > 0:
            restaurants_dict = [restaurant.to_dict() for restaurant in restaurants]
            response = make_response(restaurants_dict, 200)
            return response
        else:
            return make_response({"Error": "No Restaurants in Database"}, 404)
    
    def post(self):
        new_restaurant_data = request.get_json()
        new_restaurant = Restaurant(
            name=new_restaurant_data.get("name"),
            location=new_restaurant_data.get("location")
            )
        db.session.add(new_restaurant)
        db.session.commit()

        response = make_response(new_restaurant.to_dict(), 201)
        return response
    
api.add_resource(Restaurants, '/restaurants')

class RestaurantById(Resource):

    def get(self, id):
        restaurant = Restaurant.query.filter_by(id = id).first()

        if restaurant:
            response = make_response(restaurant.to_dict(), 200)
            return response
        else:
            return make_response({"Error":"No such Restaurant"}, 404)
    
    def patch(self, id):
        restaurant = Restaurant.query.filter_by(id = id).first()
        
        if restaurant:

            for attr in request.get_json():
                setattr(restaurant, attr, request.get_json()[attr])

            db.session.add(restaurant)
            db.session.commit()

            response = make_response(restaurant.to_dict(), 200)
            return response
        else:
            return make_response({"Error": "No such Restaurant"}, 404)
        
    def delete(self, id):
        restaurant = Restaurant.query.filter_by(id = id).first()

        if restaurant:
            db.session.delete(restaurant)
            db.session.commit()
            
            response = make_response({},204)
            return response
        else:
            return make_response({"Error": "No such Restaurant"}, 404)
        
api.add_resource(RestaurantById, '/restaurants/<int:id>')

class Items(Resource):

    def get(self):
        items = Item.query.all()

        if items:
            items_dict = [item.to_dict() for item in items]
            response = make_response(items_dict, 200)
            return response
        else:
            return make_response({"Error": "No Items in Database"}, 404)
    
    def post(self):
        new_item_data = request.get_json()
        new_item = Item(
            name=new_item_data.get("name"),
            price=new_item_data.get("price"),
            restaurant_id=new_item_data.get("restaurant_id")
            )
        db.session.add(new_item)
        db.session.commit()

        response = make_response(new_item.to_dict(), 201)
        return response
    
api.add_resource(Items, '/items')

class ItemById(Resource):

    def get(self, id):
        item = Item.query.filter_by(id = id).first()

        if item:
            response = make_response(item.to_dict(), 200)
            return response
        else:
            return make_response({"Error":"No such Item"}, 404)
    
    def patch(self, id):
        item = Item.query.filter_by(id = id).first()
        
        if item:

            for attr in request.get_json():
                setattr(item, attr, request.get_json()[attr])

            db.session.add(item)
            db.session.commit()

            response = make_response(item.to_dict(), 200)
            return response
        else:
            return make_response({"Error": "No such Item"}, 404)
        
    def delete(self, id):
        item = Item.query.filter_by(id = id).first()

        if item:
            db.session.delete(item)
            db.session.commit()
            
            response = make_response({},204)
            return response
        else:
            return make_response({"Error": "No such Item"}, 404)
        
api.add_resource(ItemById, '/items/<int:id>')

class Reviews(Resource):

    def get(self):
        reviews = Review.query.all()

        if len(reviews) > 0:
            reviews_dict = [review.to_dict() for review in reviews]
            response = make_response(reviews_dict, 200)
            return response
        else:
            return make_response({"Error": "No Reviews in Database"}, 404)
    
    def post(self):
        new_review_data = request.get_json()
        new_review = Review(
            content=new_review_data.get("content"),
            customer=new_review_data.get("customer"),
            item=new_review_data.get("item")
            )
        db.session.add(new_review)
        db.session.commit()

        response = make_response(new_review.to_dict(), 201)
        return response
    
api.add_resource(Reviews, '/reviews')

class ReviewById(Resource):

    def get(self, id):
        review = Review.query.filter_by(id = id).first()

        if review:
            response = make_response(review.to_dict(), 200)
            return response
        else:
            return make_response({"Error": "No such review"}, 404)
    
    def patch(self, id):
        review = Review.query.filter_by(id = id).first()
        
        if review:

            for attr in request.get_json():
                setattr(review, attr, request.get_json()[attr])

            db.session.add(review)
            db.session.commit()

            response = make_response(review.to_dict(), 200)
            return response
        else:
            return make_response({"Error": "No such Review"}, 404)
        
    def delete(self, id):
        review = Review.query.filter_by(id = id).first()

        if review:
            db.session.delete(review)
            db.session.commit()
            
            response = make_response({},204)
            return response
        else:
            return make_response({"Error": "No such Review"}, 404)
        
api.add_resource(ReviewById, '/reviews/<int:id>')

class Orders(Resource):

    def get(self):
        orders = Order.query.all()

        if len(orders) > 0:
            orders_dict = [order.to_dict() for order in orders]
            response = make_response(orders_dict, 200)
            return response
        else:
            return make_response({"Error": "No Orders in Database"}, 404)
    
    def post(self):
        new_order_data = request.get_json()
        new_order = Order(
            amount = new_order_data.get("amount"),
            customer= new_order_data.get("customer"),
            item=new_order_data.get("item")
            )
        db.session.add(new_order)
        db.session.commit()

        response = make_response(new_order.to_dict(), 201)
        return response
    
api.add_resource(Orders, '/orders')

class OrderById(Resource):

    def get(self, id):
        order = Order.query.filter_by(id = id).first()

        if order:
            response = make_response(order.to_dict(), 200)
            return response
        else:
            return make_response({"Error": "No such Order"}, 404)
    
    def patch(self, id):
        order = Order.query.filter_by(id = id).first()
        
        if order:

            for attr in request.get_json():
                setattr(order, attr, request.get_json()[attr])

            db.session.add(order)
            db.session.commit()

            response = make_response(order.to_dict(), 200)
            return response
        else:
            return make_response({"Error": "No such Order"}, 404)
        
    def delete(self, id):
        order = Review.query.filter_by(id = id).first()

        if order:
            db.session.delete(order)
            db.session.commit()
            
            response = make_response({},204)
            return response
        else:
            return make_response({"Error": "No such Order"}, 404)
        
api.add_resource(OrderById, '/orders/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)