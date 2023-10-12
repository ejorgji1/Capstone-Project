from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class AddToCartForm(FlaskForm):
    watch_id = IntegerField('Watch ID', validators=[DataRequired()])