"""Initial migration

Revision ID: a0c394c8ef43
Revises: 
Create Date: 2023-11-09 10:25:55.187799

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a0c394c8ef43'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=80), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('role', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('assets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('description', sa.String(length=250), nullable=True),
    sa.Column('category', sa.String(length=50), nullable=True),
    sa.Column('image_url', sa.String(length=200), nullable=True),
    sa.Column('status', sa.String(length=20), nullable=True),
    sa.Column('username', sa.String(length=80), nullable=True),
    sa.ForeignKeyConstraint(['username'], ['users.username'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('password_reset_token',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('token', sa.String(length=100), nullable=False),
    sa.Column('expiration', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('asset_allocations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('asset_name', sa.String(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('allocation_date', sa.DateTime(), nullable=True),
    sa.Column('deallocation_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['asset_name'], ['assets.name'], ),
    sa.ForeignKeyConstraint(['username'], ['users.username'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('asset_requests',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('requester_name', sa.String(length=80), nullable=False),
    sa.Column('asset_name', sa.String(length=100), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('reason', sa.String(length=250), nullable=False),
    sa.Column('urgency', sa.String(length=20), nullable=True),
    sa.Column('status', sa.String(length=20), nullable=True),
    sa.Column('completion_date', sa.DateTime(), nullable=True),
    sa.Column('approved', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['asset_name'], ['assets.name'], ),
    sa.ForeignKeyConstraint(['requester_name'], ['users.username'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('asset_requests')
    op.drop_table('asset_allocations')
    op.drop_table('password_reset_token')
    op.drop_table('assets')
    op.drop_table('users')
    # ### end Alembic commands ###
