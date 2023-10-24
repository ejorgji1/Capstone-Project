from flask import Blueprint, jsonify, request
from ..models import Review, db, Watch, Cart
from datetime import datetime
from flask_login import current_user, login_user, logout_user, login_required
from ..forms.watch_form import WatchForm
from ..forms.add_to_cart_form import AddToCartForm
from .auth_routes import validation_errors_to_error_messages

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('', methods = ['POST'])
@login_required
def add_to_cart():
    form = AddToCartForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        watch_id = form.watch_id.data,
        owner_id = current_user.id

        watch = Watch.query.get(watch_id)

        if not watch:
            return {"error": " Watch not found"}

        if watch.owner_id == owner_id:
            return jsonify({'error': 'You are the owner of the watch and cannot add it to your cart'}), 400


        if watch.cart:
            return jsonify({'error': 'Watch is already in a cart'}), 400

        cart = Cart.query.filter_by(owner_id=owner_id).first()

        if not cart:
            cart = Cart(owner_id=owner_id)
            db.session.add(cart)

        else:
            if watch in cart.watches:
                return jsonify({'error': 'Watch is already in the cart'}), 400

        cart.watches.append(watch)
        db.session.commit()
        return jsonify({'message': 'Watch added to cart successfully'})

    return jsonify({'errors': form.errors}), 400

#Get current users cart
@cart_routes.route('/get_cart', methods=['GET'])
@login_required
def get_cart():
    owner_id = current_user.id

    # Retrieve the cart for the user
    cart = Cart.query.filter_by(owner_id=owner_id).first()

    if not cart:
        return jsonify({'message': 'Cart is empty'}), 404

    watches_in_cart = [{'id': watch.id, 'brand': watch.brand, 'model_name': watch.model_name,'image_url': watch.image_url, 'price': float(watch.price)} for watch in cart.watches]

    cart_info = {
        'cart_id': cart.id,
        'owner_id': cart.owner_id,
        'quantity': cart.quantity,
        'watches': watches_in_cart
    }

    return jsonify({'cart': cart_info}), 200

#Delete a watch from cart
@cart_routes.route('/remove_watch/<int:watch_id>', methods=['DELETE'])
@login_required
def remove_watch_from_cart(watch_id):
    owner_id = current_user.id

    cart = Cart.query.filter_by(owner_id=owner_id).first()

    if not cart:
        return jsonify({'message': 'Cart is empty'}), 404

    watch_to_remove = Watch.query.get(watch_id)

    if not watch_to_remove:
        return jsonify({'message': 'Watch not found'}), 404

    if watch_to_remove not in cart.watches:
        return jsonify({'message': 'Watch is not in the cart'}), 400

    # cart.watches.remove(watch_to_remove)
    watch_to_remove.cart_id = None
    db.session.commit()

    return jsonify({'message': 'Watch removed from cart successfully'}), 200

#Delete cart 
@cart_routes.route('/delete_cart', methods=['DELETE'])
@login_required
def delete_cart():
    owner_id = current_user.id

    cart = Cart.query.filter_by(owner_id=owner_id).first()

    if not cart:
        return jsonify({'message': 'Cart not found'}), 404

    for watch in cart.watches:
        watch.cart_id = None

    db.session.delete(cart)
    db.session.commit()

    return jsonify({'message': 'Cart deleted successfully'}), 200