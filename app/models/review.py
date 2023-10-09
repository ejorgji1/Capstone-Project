from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .watch import Watch
# from .user import User

class Review(db.Model):
    __tablename__= 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("users.id")))
    watch_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("watches.id")))
    review_body = db.Column(db.String(500), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now())

    watch_review  = db.relationship("Watch", back_populates="reviews")
    user = db.relationship("User", back_populates= "reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'watch_id': self.watch_id,
            'review_body': self.review_body,
            'rating': self.rating,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user_first_name' : self.user.first_name,
            'user_last_name' : self.user.last_name,
        }
