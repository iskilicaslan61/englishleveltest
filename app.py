from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = request.get_json()
        name = data.get('name')
        score = data.get('score')
        level = data.get('level')

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

        return jsonify({"message": "Email sent successfully!"}), 200

    except Exception as e:
        print("❌ Error sending email:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/health')
def health():
    return jsonify({"message": "English Level Placement Test Backend is running."})

#if __name__ == '__main__':
#    app.run(debug=True)
