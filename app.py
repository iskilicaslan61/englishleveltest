from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
import os

# .env dosyasını yükle
load_dotenv()

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')  # templates/index.html render edilir

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

        subject = "New Placement Test Result"
        body = f"Student: {name}\nScore: {score}/6\nLevel: {level}"

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
