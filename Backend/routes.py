from flask import Flask, request, jsonify
from flask_cors import CORS
from models.dbconfig import db
from config import SQLAlchemyConfig
from models.user import User
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta, datetime
import jwt
import traceback

from models.dbconfig import db
from config import CloudinaryConfig, SQLAlchemyConfig
from models.asset import Asset
from models.assetallocation import AssetAllocation
from models.assetrequest import AssetRequest
from models. PasswordResetToken import PasswordResetToken
from models.user import User

def create_app():
    app = Flask(__name__)
    app.secret_key = 'ucxAh7RmDwLoNsbmJpQARngrp24'
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLAlchemyConfig.SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLAlchemyConfig.SQLALCHEMY_TRACK_MODIFICATIONS
    db.init_app(app)
    bcrypt = Bcrypt(app)
    jwt_manager = JWTManager(app)

    @app.route('/register', methods=['POST'])
    def register():
        try:
            data = request.get_json()
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')
            role = data.get('role')

            existing_user = User.query.filter_by(username=username).first()
            if existing_user:
                return jsonify({'message': 'Username already exists. Please choose another username.'}), 400

            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            new_user = User(username=username, password=hashed_password, email=email, role=role)
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'message': 'User registered successfully'}), 201
        except Exception as e:
            print(f"Error: {str(e)}")
            print(traceback.format_exc())  
            db.session.rollback()
            return jsonify({'message': 'An error occurred while registering the user'}), 500


    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            expiration_time = timedelta(hours=24)
            access_token = create_access_token(identity={'user_id': user.id, 'role': user.role}, expires_delta=expiration_time)
            return jsonify({'message': 'Login successful', 'access_token': access_token, 'role': user.role}), 200
        else:
            return jsonify({'message': 'Invalid username or password'}), 401

    @app.route('/add_data', methods=['POST'])
    @jwt_required()
    def add_data():
        current_user = get_jwt_identity()
        user_role = current_user.get('role')

        if user_role in ['Admin', 'Procurement Manager']:
            data = request.get_json()

            if 'name' not in data or 'quantity' not in data:
                return jsonify({'message': 'Name and quantity are required fields.'}), 400

            data_entry = {
                'name': data['name'],
                'quantity': data['quantity']
            }
            return jsonify({'message': 'Data added successfully'}), 201
        else:
            error_message = 'Unauthorized. Only Admins and Procurement Managers can add data.'
            print(f'User role: {user_role}')  # Print user role to console
            return jsonify({'message': error_message}), 403

    @app.route('/update_data/<int:data_id>', methods=['PUT'])
    @jwt_required()
    def update_data(data_id):
        current_user = get_jwt_identity()
        if current_user.get('role') == 'Admin':
            data = request.get_json()
            new_name = data.get('name')
            new_quantity = data.get('quantity')

            data_record = Asset.query.get(data_id)
            if data_record:
                data_record.name = new_name
                data_record.quantity = new_quantity
                db.session.commit()
                return jsonify({'message': 'Data updated successfully'}), 200
            else:
                return jsonify({'message': 'Data not found'}), 404
        else:
            return jsonify({'message': 'Unauthorized. Only Admins can update data.'}), 403

    @app.route('/remove_data/<int:data_id>', methods=['DELETE'])
    @jwt_required()
    def remove_data(data_id):
        current_user = get_jwt_identity()
        
        if current_user.get('role') != 'Admin':
            return jsonify({'message': 'Unauthorized. Only Admins can remove data.'}), 403
        
        data_record = Asset.query.get(data_id)
        
        if data_record:
            db.session.delete(data_record)
            db.session.commit()
            return jsonify({'message': 'Asset removed successfully'}), 200
        else:
            return jsonify({'message': 'Asset not found'}), 404

    @app.route('/get_asset/<int:asset_id>', methods=['GET'])
    @jwt_required()
    def get_asset(asset_id):
        asset = Asset.query.get(asset_id)

        if not asset:
            return jsonify({'message': 'Asset not found'}), 404

        asset_data = {
            'id': asset.id,
            'name': asset.name,
            'description': asset.description,
            'category': asset.category,
            'image_url': asset.image_url,
            'status': asset.status,
            'username': asset.username,
        }

        return jsonify(asset_data), 200


    @app.route('/get_all_assets', methods=['GET'])
    @jwt_required()
    def get_all_assets():
        assets = Asset.query.all()

        asset_list = []
        for asset in assets:
            asset_list.append({
                'id': asset.id,
                'name': asset.name,
                'description': asset.description,
                'category': asset.category
            })

        return jsonify({'assets': asset_list}), 200

    @app.route('/admin_view_user_requests', methods=['GET'])
    @jwt_required()
    def admin_view_user_requests():
        current_user = get_jwt_identity()
        if current_user.get('role') == 'Admin':
            active_requests = AssetRequest.query.filter_by(approved=False).all()
            completed_requests = AssetRequest.query.filter_by(approved=True).all()
            active_requests_list = []
            completed_requests_list = []

            for request in active_requests:
                active_requests_list.append({
                    'id': request.id,
                    'reason': request.reason,
                    'quantity': request.quantity,
                    'urgency': request.urgency
                })

            for request in completed_requests:
                completed_requests_list.append({
                    'id': request.id,
                    'reason': request.reason,
                    'quantity': request.quantity,
                    'urgency': request.urgency
                })

            return jsonify({
                'active_requests': active_requests_list,
                'completed_requests': completed_requests_list
            }), 200
        else:
            return jsonify({'message': 'Unauthorized. Only Admins can view user requests.'}), 403

    @app.route('/admin_view_asset_requests', methods=['GET'])
    @jwt_required()
    def admin_view_asset_requests():
        current_user = get_jwt_identity()
        if current_user.get('role') == 'Admin':
            pending_requests = AssetRequest.query.filter_by(approved=False).all()
            completed_requests = AssetRequest.query.filter_by(approved=True).all()
            pending_requests_list = []
            completed_requests_list = []

            for request in pending_requests:
                pending_requests_list.append({
                    'id': request.id,
                    'reason': request.reason,
                    'quantity': request.quantity,
                    'urgency': request.urgency
                })

            for request in completed_requests:
                completed_requests_list.append({
                    'id': request.id,
                    'reason': request.reason,
                    'quantity': request.quantity,
                    'urgency': request.urgency
                })

            return jsonify({
                'pending_requests': pending_requests_list,
                'completed_requests': completed_requests_list
            }), 200
        else:
            return jsonify({'message': 'Unauthorized. Only Admins can view asset requests.'}), 403

    @app.route('/classify', methods=['GET'])
    @jwt_required()
    def classify_user():
        current_user = get_jwt_identity()
        user_role = current_user.get("role")

        classification = "Unknown"
        if user_role == "Admin":
            classification = "Admin User"
        elif user_role == "Procurement Manager":
            classification = "Procurement Manager"
        elif user_role == "Normal Employee":
            classification = "Normal Employee"

        return jsonify({"message": "Success", "classification": classification}), 200

    @app.route('/approve_request/<int:request_id>', methods=['PUT'])
    @jwt_required()
    def approve_request(request_id):
        current_user = get_jwt_identity()

        if current_user.get('role') != 'Procurement Manager':
            return jsonify({'message': 'Unauthorized. Only Procurement Managers can approve requests.'}), 403

        asset_request = AssetRequest.query.get(request_id)

        if not asset_request:
            return jsonify({'message': 'Asset request not found'}), 404

        asset_request.approved = True
        db.session.commit()

        return jsonify({'message': 'Asset request approved successfully'}), 200

    @app.route('/manager_pending_requests', methods=['GET'])
    @jwt_required()
    def manager_pending_requests():
        current_user = get_jwt_identity()
        if current_user.get('role') != 'Procurement Manager':
            return jsonify({'message': 'Unauthorized. Only Procurement Managers can view pending requests.'}), 403
        pending_requests = AssetRequest.query.filter_by(approved=False).all()
        requests_list = []
        for request in pending_requests:
            requests_list.append({
                'id': request.id,
                'reason': request.reason,
                'quantity': request.quantity,
                'urgency': request.urgency
            })
        return jsonify({'pending_requests': requests_list}), 200

    @app.route('/manager_completed_requests', methods=['GET'])
    @jwt_required()
    def manager_completed_requests():
        current_user = get_jwt_identity()
        if current_user.get('role') != 'Procurement Manager':
            return jsonify({'message': 'Unauthorized. Only Procurement Managers can view completed requests.'}), 403
        completed_requests = AssetRequest.query.filter_by(approved=True).all()
        requests_list = []
        for request in completed_requests:
            requests_list.append({
                'id': request.id,
                'reason': request.reason,
                'quantity': request.quantity,
                'urgency': request.urgency
            })
        return jsonify({'completed_requests': requests_list}), 200

    @app.route('/add_asset', methods=['POST'])
    @jwt_required()
    def add_asset():
        current_user = get_jwt_identity()
        if current_user.get('role') not in ['Admin', 'Procurement Manager']:
            return jsonify({'message': 'Unauthorized. Only Admins and Procurement Managers can add assets.'}), 403

        data = request.get_json()
        name = data.get('name')
        description = data.get('description')
        category = data.get('category')
        status = data.get('status')
        image_url = data.get('image_url')
        username = data.get('username')

        new_asset = Asset(
            name=name,
            description=description,
            category=category,
            status=status,
            image_url=image_url,
            username=username,
        )
        db.session.add(new_asset)
        db.session.commit()

        return jsonify({'message': 'Asset added successfully'}), 201

    @app.route('/update_asset/<int:asset_id>', methods=['PUT'])
    @jwt_required()
    def update_asset(asset_id):
        asset = Asset.query.get(asset_id)

        if not asset:
            return jsonify({'message': 'Asset not found'}), 404

        data = request.get_json()

        if 'name' in data:
            asset.name = data['name']
        if 'description' in data:
            asset.description = data['description']
        if 'category' in data:
            asset.category = data['category']
        if 'status' in data:
            asset.status = data['status']
        if 'image_url' in data:
            asset.image_url = data['image_url']
        if 'user_id' in data:
            asset.user_id = data['user_id']

        try:
            db.session.commit()
            return jsonify({'message': 'Asset updated successfully'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'message': 'Failed to update asset. Please check your data.'}), 500



    @app.route('/allocate_asset', methods=['POST'])
    @jwt_required()
    def allocate_asset():
        data = request.get_json()
        asset_name = data.get('asset_name')
        username = data.get('username')
        allocation_date_str = data.get('allocation_date')
        deallocation_date_str = data.get('deallocation_date')

        allocation_date = datetime.fromisoformat(allocation_date_str)
        deallocation_date = datetime.fromisoformat(deallocation_date_str) if deallocation_date_str else None

        asset_allocation = AssetAllocation(asset_name=asset_name, username=username, allocation_date=allocation_date, deallocation_date=deallocation_date)
        db.session.add(asset_allocation)
        db.session.commit()

        return jsonify({'message': 'Asset allocated to employee successfully'}), 201


    @app.route('/request_asset', methods=['POST'])
    @jwt_required()
    def request_asset():
        try:
            current_user = get_jwt_identity()
            print(f"JWT Payload: {current_user}")  

            allowed_roles = ['Normal Employee', 'normalEmployee']  
            if current_user.get('role') not in allowed_roles:
                return jsonify({'message': 'Unauthorized. Only Normal Employees can request assets.'}), 403

            data = request.get_json()
            
            requester_name = current_user.get('username')  # Get the username from the JWT payload
            quantity = data.get('quantity')
            reason = data.get('reason')
            urgency = data.get('urgency')

            # Check if required fields are provided
            if requester_name is None or quantity is None or reason is None:
                return jsonify({'message': 'Missing required fields: requester_name, quantity, or reason.'}), 400

            asset_request = AssetRequest(
                requester_name=requester_name,
                asset_name=None,  # You can set this to None or provide an asset name
                quantity=quantity,
                reason=reason,
                urgency=urgency,
                status=None,  # You can set this to None or provide a default status
                completion_date=None,  # You can set this to None or provide a completion date
                approved=False,  # You can set this to False by default
            )

            db.session.add(asset_request)
            db.session.commit()

            return jsonify({'message': 'Asset request submitted successfully'}), 200

        except Exception as e:
            print(e)  
            return jsonify({'message': 'Internal Server Error'}), 500


    @app.route('/user_requests', methods=['GET'])
    @jwt_required()
    def user_requests():
        current_user = get_jwt_identity()
        user_id = current_user.get('user_id')
        active_requests = AssetRequest.query.filter_by(user_id=user_id, approved=False).all()
        completed_requests = AssetRequest.query.filter_by(user_id=user_id, approved=True).all()
        active_requests_list = []
        for request in active_requests:
            active_requests_list.append({
                'id': request.id,
                'reason': request.reason,
                'quantity': request.quantity,
                'urgency': request.urgency
            })
        completed_requests_list = []
        for request in completed_requests:
            completed_requests_list.append({
                'id': request.id,
                'reason': request.reason,
                'quantity': request.quantity,
                'urgency': request.urgency
            })
        return jsonify({'active_requests': active_requests_list, 'completed_requests': completed_requests_list}), 200

    
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
