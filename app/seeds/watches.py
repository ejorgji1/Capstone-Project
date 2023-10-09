from app.models import db, Watch, environment, SCHEMA
import datetime
from sqlalchemy.sql import text

def seed_watches():

    watch1 = Watch(
        brand="Rolex",
        model_name="Submariner",
        price=21500,
        about="This watch is in overall excellent condition with minor signs of wear to the bracelet and case.",
        description="Stainless steel (40mm) w/ unidirectional rotatable bezel, green Hulk Cerachrom insert in ceramic, inner reflector ring engraved w/ serial number and scratch resistant sapphire crystal",
        image_url="https://www.bobswatches.com/images/Used-Rolex-Submariner-116610-SKU157974.jpg",
        owner_id=1,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )

    watch2 = Watch(
        brand="Rolex",
        model_name="GMT-Master",
        price=18995,
        about="This watch is in overall excellent condition with no major signs of wear. Factory sticker still intact on case sides.",
        description="	Stainless steel (40mm) w/ bidirectional rotatable 24-hour bezel, blue and black Batman Cerachrom insert in ceramic, inner reflector ring engraved w/ serial number and scratch resistant sapphire crystal",
        image_url="https://www.bobswatches.com/images/Used-Rolex-GMT-Master-II-126710-sku-159556.jpg",
        owner_id=1,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )

    watch3 = Watch(
        brand="Rolex",
        model_name="Milgauss",
        price=11595,
        about="This watch is in overall excellent condition with light surface wear on the bracelet.",
        description="Black w/ Chromalight hands and orange Index markers on the 3, 6 & 9 o'clock w/ Orange lightning bolt seconds hand",
        image_url="https://www.bobswatches.com/images/Used-Rolex-Milgauss-116400-sku-160013.jpg",
        owner_id=2,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )

    watch4 = Watch(
        brand="Omega",
        model_name="Seamaster 300M",
        price=8295,
        about="This watch is brand new. Comes with papers and original documents",
        description="Black wave dial w/ luminous skeleton hands and hour markers w/ date window at 6 o'clock ",
        image_url="https://www.bobswatches.com/omega/images/Used-Omega-Seamaster-310.20.42.20.01.001-sku-159379.jpg",
        owner_id=2,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )

    watch5 = Watch(
        brand="Tudor",
        model_name="Heritage Black Bay 79030B",
        price=2995,
        about="This watch is in overall excellent condition.",
        description="Blue w/ luminous hour markers and snowflake hands",
        image_url="https://www.bobswatches.com/tudor/images/Used-Tudor-Black-Bay-79030-SKU159319.jpg",
        owner_id=3,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )

    db.session.add_all([
    watch1, watch2, watch3, watch4, watch5
    ])

    db.session.commit()

def undo_watches():
    if environment == "production":
       db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
       db.session.execute(text("DELETE FROM watches"))

    db.session.commit()

    