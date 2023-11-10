from models.dbconfig import db

class AssetAllocation(db.Model):
    __tablename__ = 'asset_allocations'

    id = db.Column(db.Integer, primary_key=True)
    asset_name = db.Column(db.String, db.ForeignKey('assets.name'), nullable=False)
    username = db.Column(db.String, db.ForeignKey('users.username'), nullable=False)
    allocation_date = db.Column(db.DateTime)
    deallocation_date = db.Column(db.DateTime)