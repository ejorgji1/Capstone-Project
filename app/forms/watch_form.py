from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField
from wtforms.validators import DataRequired, Length, ValidationError, NumberRange
from app.models import Watch
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws import ALLOWED_EXTENSIONS


# def valid_image_url(form, field):
#     file = field.data
#     if ('.' in file and file.rsplit('.', 1)[1].lower() not in ALLOWED_EXTENSIONS) or ('.' not in file):
#         raise ValidationError("Invalid Image File Extension")

class WatchForm(FlaskForm):
    brand = StringField('Brand', validators=[DataRequired(),Length(max=500)])
    model_name = StringField('Model_Name', validators=[DataRequired(),Length(max=500)])
    price = DecimalField('Price', places=2, rounding=None, number_format='%.7f', validators=[DataRequired(), NumberRange(min=1)])
    about = StringField('About', validators=[DataRequired(),Length(max=500)])
    description = StringField('Description', validators=[DataRequired(),Length(max=500)])
    image_url = FileField("Item Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    # cart_id = IntegerField('Cart ID', validators=[NumberRange(min=1, message='Cart ID must be a positive integer')])