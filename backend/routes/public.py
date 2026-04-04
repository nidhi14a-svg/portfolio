import os
from flask import Blueprint, request, jsonify, send_from_directory, current_app
from models import Project, Skill, Message, Media, Setting, db

public_bp = Blueprint('public', __name__)

@public_bp.route('/portfolio', methods=['GET'])
def get_portfolio_data():
    """Aggregate endpoint for initial fast load"""
    settings = {s.key: s.value for s in Setting.query.all()}
    featured_projects = [p.to_dict() for p in Project.query.filter_by(is_featured=True).all()]
    skills = [s.to_dict() for s in Skill.query.all()]
    
    return jsonify({
        "settings": settings,
        "featured_projects": featured_projects,
        "skills": skills
    }), 200

@public_bp.route('/projects', methods=['GET'])
def get_projects():
    projects = Project.query.order_by(Project.created_at.desc()).all()
    return jsonify([p.to_dict() for p in projects]), 200

@public_bp.route('/projects/<int:id>', methods=['GET'])
def get_project(id):
    project = Project.query.get_or_404(id)
    return jsonify(project.to_dict()), 200

@public_bp.route('/skills', methods=['GET'])
def get_skills():
    skills = Skill.query.all()
    return jsonify([s.to_dict() for s in skills]), 200

@public_bp.route('/gallery', methods=['GET'])
def get_gallery():
    media = Media.query.filter_by(type='gallery').order_by(Media.uploaded_at.desc()).all()
    return jsonify([m.to_dict() for m in media]), 200

@public_bp.route('/contact', methods=['POST'])
def submit_contact():
    data = request.get_json()
    if not data or not data.get('name') or not data.get('email') or not data.get('message'):
        return jsonify({"msg": "Missing required fields"}), 400
        
    new_message = Message(
        name=data['name'],
        email=data['email'],
        message=data['message']
    )
    db.session.add(new_message)
    db.session.commit()
    return jsonify({"msg": "Message sent successfully"}), 201

@public_bp.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)

@public_bp.route('/resume', methods=['GET'])
def get_resume():
    resume_meta = Media.query.filter_by(type='resume').order_by(Media.uploaded_at.desc()).first()
    if resume_meta:
        # Assuming URL stores just the filename or path relative to uploads in local storage
        filename = resume_meta.url.split('/')[-1]
        return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)
    return jsonify({"msg": "Resume not found"}), 404
