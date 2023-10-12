from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField
from wtforms.validators import DataRequired, Length, ValidationError, NumberRange
from app.models import Watch
from flask_wtf.file import FileField, FileAllowed, FileRequired


ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

def valid_image_url(form, field):
    file = field.data
    if ('.' in file and file.rsplit('.', 1)[1].lower() not in ALLOWED_EXTENSIONS) or ('.' not in file):
        raise ValidationError("Invalid Image File Extension")

class WatchForm(FlaskForm):
    brand = StringField('Brand', validators=[DataRequired(),Length(max=500)])
    model_name = StringField('Model_Name', validators=[DataRequired(),Length(max=500)])
    price = DecimalField('Price', places=2, rounding=None, number_format='%.7f', validators=[DataRequired(), NumberRange(min=1)])
    about = StringField('About', validators=[DataRequired(),Length(max=500)])
    description = StringField('Description', validators=[DataRequired(),Length(max=500)])
    image_url = StringField("Image_url", validators=[DataRequired(), valid_image_url])
    # cart_id = IntegerField('Cart ID', validators=[NumberRange(min=1, message='Cart ID must be a positive integer')])