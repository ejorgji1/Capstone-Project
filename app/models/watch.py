from .db import db, environment, SCHEMA, add_prefix_for_prod


class Watch(db.Model):
    __tablename__ = "watches"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(length=50), nullable=False)
    model_name = db.Column(db.String(length=255), nullable=False)
    price = db.Column(db.Numeric(7, 2), nullable=False)
    about = db.Column(db.String(length=500), nullable=False)
    description = db.Column(db.String(length=500), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')))
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    cart = db.relationship("Cart", back_populates="watches")
    user = db.relationship("User", back_populates="watches")
    reviews = db.relationship("Review", back_populates="watch_review")


    def to_dict(self):
        return {
            'id': self.id,
            'brand': self.brand,
            'model_name': self.model_name,
            'price': self.price,
            'about': self.about,
            'description': self.description,
            'image_url': self.image_url,
            'owner_id': self.owner_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'cart_id': self.cart_id
        }
