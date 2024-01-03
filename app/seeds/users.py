from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demolition', email='demo@aa.io', first_name='Demo', last_name='Lition', password='password')
    marnie = User(
        username='marniemorine', email='marnie@aa.io', first_name='Marnie', last_name='Mornie', password='password1')
    bobbie = User(
        username='bobbiebuild', email='bobbie@aa.io',first_name='Bobbie', last_name='Builder', password='password2')
    sal_mon = User(
        username='river_swimmer', email='fish@ocean.io', first_name='Sal', last_name='Mon', password='password56')
    rob_in = User(
        username='bird_lover', email='nature@fly.io', first_name='Rob', last_name='In', password='password57')
    grace_full = User(
        username='elegant_dancer', email='ballet@move.io', first_name='Grace', last_name='Full', password='password58')
    brooke_lyn = User(
        username='ny_resident', email='newyork@bridge.io', first_name='Brooke', last_name='Lyn', password='password59')
    amber_alert = User(
        username='safety_first', email='emergency@warning.io', first_name='Amber', last_name='Alert', password='password60')
    earl_y = User(
        username='morning_person', email='dawn@rise.io', first_name='Earl', last_name='Y', password='password61')
    mae_flower = User(
        username='pilgrim_ship', email='voyages@sea.io', first_name='Mae', last_name='Flower', password='password62')
    will_power = User(
        username='inner_strength', email='determination@resolve.io', first_name='Will', last_name='Power', password='password63')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(sal_mon)
    db.session.add(rob_in)
    db.session.add(grace_full)
    db.session.add(brooke_lyn)
    db.session.add(amber_alert)
    db.session.add(earl_y)
    db.session.add(mae_flower)
    db.session.add(will_power)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()