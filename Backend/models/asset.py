from models.dbconfig import db

class Asset(db.Model):
    __tablename__ = 'assets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(250))
    category = db.Column(db.String(50))
    image_url = db.Column(db.String(200))
    status = db.Column(db.String(20)) 
    username = db.Column(db.String(80), db.ForeignKey('users.username'))

    user = db.relationship('User', backref='assets', lazy=True)
    asset_requests = db.relationship('AssetRequest', backref='asset', lazy=True)

    def __init__(self, name, description, category, image_url, status, username):
        self.name = name
        self.description = description
        self.category = category
        self.image_url = image_url
        self.status = status
        self.username = username