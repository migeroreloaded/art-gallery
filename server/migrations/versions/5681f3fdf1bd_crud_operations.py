"""CRUD operations

Revision ID: 5681f3fdf1bd
Revises: 3da779ed1b72
Create Date: 2024-07-09 20:04:51.769672

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5681f3fdf1bd'
down_revision = '3da779ed1b72'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('exhibitions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('artist_id', sa.Integer(), nullable=False))
        batch_op.create_foreign_key(batch_op.f('fk_exhibitions_artist_id_artists'), 'artists', ['artist_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('exhibitions', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_exhibitions_artist_id_artists'), type_='foreignkey')
        batch_op.drop_column('artist_id')

    # ### end Alembic commands ###
