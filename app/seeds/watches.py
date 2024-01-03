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
    watch6 = Watch(
        brand="Audemars Piguet",
        model_name="Royal Oak",
        price=25000,
        about="This watch is in overall excellent condition.",
        description="Blue w/ luminous hour markers and snowflake hands",
        image_url="https://www.bobswatches.com/audemars-piguet/images/Used-Audemars-Piguet-Royal-Oak-15202ST.OO.1240ST.01.A-SKU157239.jpg",
        owner_id=6,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )
    watch7 = Watch(
        brand="Rolex",
        model_name="Explorer",
        price=10000,
        about="This watch is in overall excellent condition.",
        description="White w/ luminous hour markers and snowflake hands",
        image_url="https://www.bobswatches.com/images/Used-Rolex-Explorer-II-226570-SKU161679.jpg",
        owner_id=7,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )
    watch8 = Watch(
        brand="Rolex",
        model_name="Submariner",
        price=12000,
        about="This watch is in overall excellent condition.",
        description="Blue w/ luminous hour markers and snowflake hands",
        image_url="https://www.bobswatches.com/images/Used-Rolex-Submariner-126613-SKU161871.jpg",
        owner_id=8,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )
    watch9 = Watch(
        brand="Omega",
        model_name="Speedmaster",
        price=5250,
        about="This watch is in overall excellent condition.",
        description="Blue w/ luminous hour markers and snowflake hands",
        image_url="https://www.bobswatches.com/omega/images/Used-Omega-Speedmaster-3577.50.00-SKU160655.jpg",
        owner_id=9,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )
    watch10 = Watch(
        brand="Rolex",
        model_name="Yacht-Master",
        price=10200,
        about="This watch is in overall excellent condition.",
        description="Blue w/ luminous hour markers and snowflake hands",
        image_url="https://www.bobswatches.com/images/Used-Rolex-Yacht-Master-116655-SKU-161025.jpg",
        owner_id=10,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )
    watch11 = Watch(
        brand="Rolex",
        model_name="Sky-Dweller",
        price=12500,
        about="This watch is in overall excellent condition.",
        description="Blue w/ luminous hour markers and snowflake hands",
        image_url="https://www.bobswatches.com/images/Used-Rolex-Sky-Dweller-326933-SKU161641.jpg",
        owner_id=11,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )
    watch12 = Watch(
        brand="Audemars Piguet",
        model_name="Royal Oak",
        price=25000,
        about="This watch is in overall excellent condition.",
        description="Blue w/ luminous hour markers and snowflake hands",
        image_url="https://www.bobswatches.com/audemars-piguet/images/Used-Audemars-Piguet-Royal-Oak-Offshore-26170ST.OO.D101CR.02-SKU161253.jpg",
        owner_id=7,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )
    watch13 = Watch(
        brand="Rolex",
        model_name="GMT-MASTER 2",
        price=13000,
        about="This watch is in overall excellent condition.",
        description="Blue w/ luminous hour markers and snowflake hands",
        image_url="https://www.bobswatches.com/images/Used-Rolex-GMT-Master-II-126711-SKU161711.jpg",
        owner_id=8,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )
    watch14 = Watch(
        brand="Rolex",
        model_name="Oyster Perpetual",
        price=4000,
        about="This watch is in overall excellent condition.",
        description="Blue w/ luminous hour markers and snowflake hands",
        image_url="https://www.bobswatches.com/images/Used-Rolex-Oyster-Perpetual-177200-SKU161543.jpg",
        owner_id=9,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )
    watch15 = Watch(
        brand="Rolex",
        model_name="Daytona",
        price=11000,
        about="This watch is in overall excellent condition.",
        description="Blue w/ luminous hour markers and snowflake hands",
        image_url="https://www.bobswatches.com/images/Used-Rolex-Daytona-116523-SKU159784.jpg",
        owner_id=2,
        created_at=datetime.datetime.now(),
        updated_at=datetime.datetime.now()
    )

    db.session.add_all([
    watch1, watch2, watch3, watch4, watch5,watch6,watch7,watch8,watch9,watch10,watch11,watch12,watch13,watch14,watch15,
    ])

    db.session.commit()

def undo_watches():
    if environment == "production":
       db.session.execute(f"TRUNCATE table {SCHEMA}.watches RESTART IDENTITY CASCADE;")
    else:
       db.session.execute(text("DELETE FROM watches"))

    db.session.commit()

    