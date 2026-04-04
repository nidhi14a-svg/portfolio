from app import create_app
from models import db, User, Setting, Project
import os

app = create_app()

def seed_database():
    with app.app_context():
        # 1. Create all tables
        db.create_all()
        print("Database tables ensured.")
        
        # 2. Seed Admin User
        admin = User.query.filter_by(username='admin').first()
        if not admin:
            new_admin = User(username='admin', email='nidhi@example.com')
            new_admin.set_password('admin123')
            db.session.add(new_admin)
            print("Seeded Admin User (admin / admin123)")

        # 3. Seed Global Settings (Dynamic Name, Bio, Tagline, Socials)
        settings_data = {
            'name': 'Nidhi Singh',
            'tagline': 'Building scalable and user-friendly web applications',
            'bio': 'Passionate engineering student with a strong interest in web development, problem-solving, and creating impactful digital solutions.',
            'contact_email': 'nidhi.contact@example.com',
            'contact_location': 'India',
            'social_github': 'https://github.com/nidhi14a-svg',
            'social_linkedin': 'https://www.linkedin.com/in/nidhi-singh-807587386',
            'social_twitter': '', # Left empty intentionally so it gracefully hides in UI
            'profile_photo_url': '' # Note: Upload your photo via CMS media center and link here!
        }
        
        for key, value in settings_data.items():
            setting = Setting.query.filter_by(key=key).first()
            if setting:
                setting.value = value
            else:
                db.session.add(Setting(key=key, value=value))
        print("Seeded Global User Settings (Bio, Links, etc.)")

        # 4. Seed Projects
        projects_data = [
            {
                'title': 'To-Do List Website',
                'description': 'A simple and efficient task management web application that allows users to add, delete, and manage daily tasks.',
                'tech_stack': 'HTML,CSS,JavaScript',
                'github_url': 'https://github.com/nidhi14a-svg/todo',
                'live_url': 'https://todo-red-ten-28.vercel.app',
                'is_featured': True
            },
            {
                'title': 'Weather Website',
                'description': 'A real-time weather application that fetches live weather data using an API and displays it with a clean and user-friendly interface.',
                'tech_stack': 'HTML,CSS,JavaScript',
                'github_url': 'https://github.com/nidhi14a-svg/weather_app',
                'live_url': 'https://weather-app-omega-one-24.vercel.app',
                'is_featured': True
            },
            {
                'title': 'Digital Clock',
                'description': 'A real-time digital clock that dynamically updates and provides a clean UI with theme support.',
                'tech_stack': 'HTML,CSS,JavaScript',
                'github_url': 'https://github.com/nidhi14a-svg/clock',
                'live_url': 'https://clock-orcin-one.vercel.app',
                'is_featured': True
            }
        ]
        
        for p_data in projects_data:
            existing_project = Project.query.filter_by(title=p_data['title']).first()
            if not existing_project:
                project = Project(
                    title=p_data['title'],
                    description=p_data['description'],
                    tech_stack=p_data['tech_stack'],
                    github_url=p_data['github_url'],
                    live_url=p_data['live_url'],
                    is_featured=p_data['is_featured']
                )
                db.session.add(project)
        print("Seeded Portfolio Projects")

        # Commit all transactions
        db.session.commit()
        print("\nSUCCESS: The database is fully seeded with Nidhi's content!")

if __name__ == '__main__':
    seed_database()
