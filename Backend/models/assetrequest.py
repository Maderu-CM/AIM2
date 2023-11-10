from models.dbconfig import db

class AssetRequest(db.Model):
    __tablename__ = 'asset_requests'

    id = db.Column(db.Integer, primary_key=True)
    requester_name = db.Column(db.String(80), db.ForeignKey('users.username'), nullable=False)
    asset_name = db.Column(db.String(100), db.ForeignKey('assets.name'))
    quantity = db.Column(db.Integer, nullable=False)
    reason = db.Column(db.String(250), nullable=False)
    urgency = db.Column(db.String(20))
    status = db.Column(db.String(20))
    completion_date = db.Column(db.DateTime)
    approved = db.Column(db.Boolean, default=False)