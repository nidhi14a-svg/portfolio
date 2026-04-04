import os
from werkzeug.utils import secure_filename
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required
from models import Project, Skill, Message, Media, Setting, db

admin_bp = Blueprint('admin', __name__)

# --- Projects ---
@admin_bp.route('/projects', methods=['POST'])
@jwt_required()
def create_project():
    data = request.get_json()
    new_project = Project(
        title=data.get('title'),
        description=data.get('description'),
        tech_stack=data.get('tech_stack', ''),
        image_url=data.get('image_url'),
        github_url=data.get('github_url'),
        live_url=data.get('live_url'),
        is_featured=data.get('is_featured', False)
    )
    db.session.add(new_project)
    db.session.commit()
    return jsonify(new_project.to_dict()), 201

@admin_bp.route('/projects/<int:id>', methods=['PUT', 'DELETE'])
@jwt_required()
def manage_project(id):
    project = Project.query.get_or_404(id)
    if request.method == 'DELETE':
        db.session.delete(project)
        db.session.commit()
        return jsonify({"msg": "Project deleted successfully"}), 200
    
    data = request.get_json()
    project.title = data.get('title', project.title)
    project.description = data.get('description', project.description)
    project.tech_stack = data.get('tech_stack', project.tech_stack)
    project.image_url = data.get('image_url', project.image_url)
    project.github_url = data.get('github_url', project.github_url)
    project.live_url = data.get('live_url', project.live_url)
    project.is_featured = data.get('is_featured', project.is_featured)
    db.session.commit()
    return jsonify(project.to_dict()), 200

# --- Skills ---
@admin_bp.route('/skills', methods=['POST'])
@jwt_required()
def create_skill():
    data = request.get_json()
    new_skill = Skill(
        name=data.get('name'),
        category=data.get('category'),
        proficiency=data.get('proficiency', 50),
        icon_url=data.get('icon_url')
    )
    db.session.add(new_skill)
    db.session.commit()
    return jsonify(new_skill.to_dict()), 201

@admin_bp.route('/skills/<int:id>', methods=['PUT', 'DELETE'])
@jwt_required()
def manage_skill(id):
    skill = Skill.query.get_or_404(id)
    if request.method == 'DELETE':
        db.session.delete(skill)
        db.session.commit()
        return jsonify({"msg": "Skill deleted successfully"}), 200
    
    data = request.get_json()
    skill.name = data.get('name', skill.name)
    skill.category = data.get('category', skill.category)
    skill.proficiency = data.get('proficiency', skill.proficiency)
    skill.icon_url = data.get('icon_url', skill.icon_url)
    db.session.commit()
    return jsonify(skill.to_dict()), 200

# --- Settings ---
@admin_bp.route('/settings', methods=['PUT'])
@jwt_required()
def update_settings():
    data = request.get_json() # expects { "key1": "value1", "key2": "value2" }
    for key, value in data.items():
        setting = Setting.query.filter_by(key=key).first()
        if setting:
            setting.value = value
        else:
            new_setting = Setting(key=key, value=value)
            db.session.add(new_setting)
    db.session.commit()
    return jsonify({"msg": "Settings updated successfully"}), 200

# --- Messages ---
@admin_bp.route('/messages', methods=['GET'])
@jwt_required()
def get_messages():
    messages = Message.query.order_by(Message.created_at.desc()).all()
    return jsonify([m.to_dict() for m in messages]), 200

@admin_bp.route('/messages/<int:id>', methods=['PUT', 'DELETE'])
@jwt_required()
def manage_message(id):
    message = Message.query.get_or_404(id)
    if request.method == 'DELETE':
        db.session.delete(message)
        db.session.commit()
        return jsonify({"msg": "Message deleted"}), 200
    
    data = request.get_json()
    message.is_read = data.get('is_read', message.is_read)
    db.session.commit()
    return jsonify(message.to_dict()), 200

# --- File Uploads ---
def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'pdf'}
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@admin_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_file():
    if 'file' not in request.files:
        return jsonify({"msg": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"msg": "No selected file"}), 400
    
    type = request.form.get('type', 'gallery') # e.g., 'resume', 'gallery', 'profile'
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        file_url = f"/api/public/uploads/{filename}"
        
        # Save to media table
        new_media = Media(
            url=file_url,
            alt_text=request.form.get('alt_text', ''),
            type=type
        )
        db.session.add(new_media)
        db.session.commit()
        
        return jsonify(new_media.to_dict()), 201
        
    return jsonify({"msg": "File type not allowed"}), 400

@admin_bp.route('/media/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_media(id):
    media = Media.query.get_or_404(id)
    
    # Extract filename from url and try to delete it
    filename = media.url.split('/')[-1]
    filepath = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(filepath):
        try:
            os.remove(filepath)
        except OSError:
            pass # Continue if file delete fails
            
    db.session.delete(media)
    db.session.commit()
    return jsonify({"msg": "Media deleted successfully"}), 200
