from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .user import User


class Cart(db.Model):
    __tablename__= 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer,primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    # watch_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod("watches.id")))
    quantity = db.Column(db.Integer, default=1, nullable=False)

    watches = db.relationship("Watch", back_populates="cart")
    user = db.relationship('User', back_populates='cart')



    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'watch_id': self.watch_id,
            'quantity': self.quantity,
        }
