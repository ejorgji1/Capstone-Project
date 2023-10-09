from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():

    review1 = Review(
        user_id = 1,
        watch_id = 2,
        review_body = "My watch arrived on time and in the exact condition as described. First purchase but I'm very happy with my choice",
        rating = 5
        )

    review2 = Review(
        user_id = 3,
        watch_id = 2,
        review_body = "Love the watch. it was in perfect condition and i was able to size it quickly myself with the adjustable bracelet. Love this watch!",
        rating = 3
        )

    review3 = Review(
        user_id = 2,
        watch_id = 1,
        review_body = "This watch is in perfect condition as were the previous watches. Wouldn't buy a Rolex from anywhere else",
        rating = 4
        )

    review4 = Review(
        user_id = 3,
        watch_id = 1,
        review_body = "Just received my watch, in excellent condition and very quick delivery via FEDEX. Don’t go crazy on your prices and you’ll have a repeat customer/collector.",
        rating = 5
        )

    review5 = Review(
        user_id = 1,
        watch_id = 3,
        review_body = "Just received my watch, in excellent condition and very quick delivery via FEDEX. Don’t go crazy on your prices and you’ll have a repeat customer/collector.",
        rating = 3
        )
    
    review6 = Review(
        user_id = 2,
        watch_id = 3,
        review_body = "World class service and communication, despite an East/West Coast time differential. Met every request and commitment. Watch was new in box, as represented.",
        rating = 5
        )


    db.session.add_all([
    review1, review2, review3, review4, review5,review6
    ])

    db.session.commit()

def undo_reviews():
    if environment == "production":
       db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
       db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()

