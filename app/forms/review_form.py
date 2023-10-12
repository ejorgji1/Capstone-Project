from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, NumberRange, Length

class ReviewForm(FlaskForm):
    review_body = StringField('Review', validators=[DataRequired(), Length(max=500)])
    rating = IntegerField('Rating', validators=[DataRequired(), NumberRange(1, 5)])
    submit = SubmitField('Submit')