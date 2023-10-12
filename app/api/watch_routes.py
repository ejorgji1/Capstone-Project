from flask import Blueprint, jsonify, request
from ..models import Review, db, Watch
from datetime import datetime
from flask_login import current_user, login_user, logout_user, login_required
from ..forms.watch_form import WatchForm
from .auth_routes import validation_errors_to_error_messages
from ..forms.search_form import SearchForm

watch_routes = Blueprint('watches', __name__)

#Get all watches
@watch_routes.route('')
def watches():
    watches = Watch.query.all()
    print(watches)
    watches_data = []

    for watch in watches:
        watch_dict = watch.to_dict()

        reviews = watch.reviews
        ratings = [review.rating for review in reviews]

        avg_rating = sum(ratings) / len(ratings) if ratings else 0
        watch_dict['avg_rating'] = round(avg_rating, 2)

        watches_data.append(watch_dict)

    return {"Watches": watches_data}

#Get one watch detail
@watch_routes.route('/<int:id>')
def single_watch_detail(id):
    watch = Watch.query.get_or_404(id)
    watch_dict = watch.to_dict()

    reviews = watch.reviews
    ratings = [review.rating for review in reviews]
    avg_rating = sum(ratings) / len(ratings) if ratings else 0
    watch_dict['avg_rating'] = round(avg_rating, 2)

    return(watch_dict)

#Create a Watch Listing
@watch_routes.route('/new-watch', methods=['POST'])
@login_required
def add_watch():
    form = WatchForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        new_watch = Watch(
        brand = form.brand.data,
        model_name = form.model_name.data,
        price = form.price.data,
        about = form.about.data,
        description = form.description.data,
        image_url = form.image_url.data,
        owner_id = current_user.id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
        )


        # print('this is new watch', new_watch)
        # print("ENEA")

        db.session.add(new_watch)
        db.session.commit()

        return new_watch.to_dict()
    else:
        print("Form validation errors:", form.errors)
        return {"errors": validation_errors_to_error_messages(form.errors)}

#Edit Watch
@watch_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_watch(id):
    form = WatchForm()

    watch_to_update = Watch.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']

    if not watch_to_update:
        return jsonify({"error": "Watch not found"}), 404

    if current_user.id != watch_to_update.owner_id:
        return jsonify({"error": "Unauthorized to edit this watch"}), 403

    if form.validate_on_submit():
        attributes_to_update = ['brand', 'model_name', 'price', 'about', 'description', 'image_url']
        for attr in attributes_to_update:
            if hasattr(form, attr):
                setattr(watch_to_update, attr, getattr(form, attr).data)
        db.session.commit()

        return {"updated_watch": watch_to_update.to_dict()}, 200

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    #     watch_to_update.brand = form.data.brand
    #     watch_to_update.model_name = form.data.model_name
    #     watch_to_update.price = form.data.price
    #     watch_to_update.about = form.data.about
    #     watch_to_update.description = form.data.description
    #     watch_to_update.image_url = form.data.image_url

    #     return {"Updated_watch": watch_to_update.to_dict()}
    # return {'errors': validation_errors_to_error_messages(form.errors)}, 401


#Delete a watch
@watch_routes.route('<int:id>/delete', methods=['DELETE'])
@login_required
def delete_watch(id):
    watch_to_delete = Watch.query.get(id)

    if watch_to_delete is None:
        return {'errors': ['Watch does not exist']}, 404
    if watch_to_delete.owner_id is not current_user.id:
        return {'errors': ['Unauthorized access']}, 403
    db.session.delete(watch_to_delete)
    db.session.commit()
    return {'message': ['Watch successfully deleted']}

#get current users watches
@watch_routes.route('/current')
@login_required
def get_current_watches():
    current_watches = Watch.query.filter(Watch.owner_id == current_user.id).all()
    watches_list = [watch.to_dict() for watch in current_watches]

    return {"Current Watches": watches_list}

#search watches by brand name
@watch_routes.route('/search', methods=['POST'])
def search_watches():
    form= SearchForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        searchTerm = form.search.data
        watches = Watch.query.filter(Watch.brand.ilike(f'%{searchTerm}%')).all()
        watch_list = [watch.to_dict() for watch in watches]
    
    return {"queried watches": watch_list}