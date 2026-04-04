from app import create_app
from models import db, User

app = create_app()

def init_admin():
    with app.app_context():
        # Ensure database tables exist before creating user
        db.create_all()
        
        # Check if admin already exists
        admin = User.query.filter_by(username='admin').first()
        if admin:
            print("Admin user already exists.")
            return

        new_admin = User(username='admin', email='admin@example.com')
        new_admin.set_password('admin123')  # Default password, user should change

        db.session.add(new_admin)
        db.session.commit()
        print("Admin user created successfully! Username: admin | Password: admin123")

if __name__ == '__main__':
    init_admin()
