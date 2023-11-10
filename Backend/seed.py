from faker import Faker
from models.dbconfig import db
from models.asset import Asset
from models.assetallocation import AssetAllocation
from models.assetrequest import AssetRequest
from models.PasswordResetToken import PasswordResetToken
from models.user import User
from app import app

fake = Faker()

# C application context
app.app_context().push()

# Create fake users
def create_fake_users(count=10):
    users = []
    for _ in range(count):
        user = User(
            username=fake.user_name(),
            password=fake.password(),
            email=fake.email(),
            role=fake.random_element(elements=('Admin', 'Procurement Manager', 'Normal Employee'))
        )
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

# Create real assets with real names, categories, and descriptions
def create_real_assets(count=20):
    assets = []
    real_asset_names = ["Laptop", "Desk Chair", "Printer", "Conference Table", "Whiteboard", "Projector", "Office Phone", "Server Rack", "Office Plants", "Filing Cabinet", "Desk", "Monitor", "Air Conditioner", "Refrigerator", "Coffee Machine", "Water Cooler", "Security Camera", "Fire Extinguisher", "First Aid Kit", "Shredder"]

    real_categories = ['Electronics', 'Furniture', 'Office Supplies']

    for _ in range(count):
        asset_name = fake.random_element(elements=real_asset_names)
        description = fake.text()
        category = fake.random_element(elements=real_categories)
        asset = Asset(
            name=asset_name,
            description=description,
            category=category,
            image_url=fake.image_url(),
            status=fake.random_element(elements=('In Use', 'Available', 'Repaired')),
            username=fake.random_element(User.query.all()).username
        )
        assets.append(asset)
    db.session.add_all(assets)
    db.session.commit()

# Create fake asset allocations
def create_fake_asset_allocations(count=30):
    allocations = []
    for _ in range(count):
        allocation = AssetAllocation(
            asset_name=fake.random_element(Asset.query.all()).name,
            username=fake.random_element(User.query.all()).username,
            allocation_date=fake.date_time_this_decade(),
            deallocation_date=fake.date_time_this_decade()
        )
        allocations.append(allocation)
    db.session.add_all(allocations)
    db.session.commit()

# Create fake asset requests
def create_fake_asset_requests(count=50):
    requests = []
    for _ in range(count):
        request = AssetRequest(
            requester_name=fake.random_element(User.query.all()).username,
            asset_name=fake.random_element(Asset.query.all()).name,
            quantity=fake.random_int(min=1, max=10),
            reason=fake.text(),
            urgency=fake.random_element(elements=('High', 'Medium', 'Low')),
            status=fake.random_element(elements=('Pending', 'Approved', 'Rejected')),
            completion_date=fake.date_time_this_decade()
        )
        requests.append(request)
    db.session.add_all(requests)
    db.session.commit()

# Create fake password reset tokens
def create_fake_password_reset_tokens(count=10):
    tokens = []
    for _ in range(count):
        token = PasswordResetToken(
            user_id=fake.random_element(User.query.all()).id,
            token=fake.sha1(),
            expiration=fake.future_datetime(end_date='+30d')
        )
        tokens.append(token)
    db.session.add_all(tokens)
    db.session.commit()

if __name__ == "__main__":
    db.create_all()
    create_fake_users()
    create_real_assets()
    create_fake_asset_allocations()
    create_fake_asset_requests()
    create_fake_password_reset_tokens()
    print("Database seeded successfully!")