from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
import os
import pymysql
import boto3
import json
from botocore.exceptions import ClientError

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# Hardcoded RDS values (host and DB name)
RDS_HOST = 'roman-db.c5i6e2kemznc.us-east-1.rds.amazonaws.com'
DB_NAME = 'roman_db'

# Fetch DB credentials from AWS Secrets Manager
def get_db_credentials(secret_name, region_name='us-east-1'):
    session = boto3.session.Session()
    client = session.client(service_name='secretsmanager', region_name=region_name)
    try:
        response = client.get_secret_value(SecretId=secret_name)
        return json.loads(response['SecretString'])
    except ClientError as e:
        raise Exception(f"❌ Error fetching DB credentials: {e}")

# Get DB credentials
creds = get_db_credentials("roman")

# Connect to RDS MySQL
db = pymysql.connect(
    host=RDS_HOST,
    user=creds['username'],
    password=creds['password'],
    database=DB_NAME,
    cursorclass=pymysql.cursors.DictCursor
)

@app.route('/')
def index():
    return render_template('index.html')  # Ensure this file exists in the 'templates' folder

@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = request.get_json()
        name = data.get('name')
        score = data.get('score')
        level = data.get('level')

        # ✅ Insert into RDS table
        with db.cursor() as cursor:
            sql = "INSERT INTO leveltest (name, score, level) VALUES (%s, %s, %s)"
            cursor.execute(sql, (name, score, level))
        db.commit()

        # ✅ Email setup
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        smtp_user = os.getenv("GMAIL_USER")
        smtp_pass = os.getenv("GMAIL_PASS")
        to_email = os.getenv("TEACHER_EMAIL")

        subject = "📘 New Placement Test Result"
        body = f"""
📘 English Level Placement Test Report

👤 Student Name: {name}
📊 Score Achieved: {score} out of 40
🧠 Assessed English Level: {level}

This report summarizes the results of the English Level Placement Test completed by the student. The level indicated reflects their current proficiency based on their responses to grammar and structure-based questions.

Please review the student's performance to determine the appropriate course or support they may need.

Best regards,  
English Placement Test System
"""

        msg = MIMEText(body)
        msg['Subject'] = subject
        msg['From'] = smtp_user
        msg['To'] = to_email

        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)

        return jsonify({"message": "Email and database save successful!"}), 200

    except Exception as e:
        print("❌ Error:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/health')
def health():
    return jsonify({"message": "English Level Placement Test Backend is running."})

#if __name__ == '__main__':
#    app.run(debug=True)
