from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

# .env dosyasını yükle
load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:8080", "http://127.0.0.1:5533", "http://localhost:5533"])

# Ortam değişkenlerini kontrol et
REQUIRED_ENV_VARS = ['GMAIL_USER', 'GMAIL_PASS', 'TEACHER_EMAIL']
missing = [var for var in REQUIRED_ENV_VARS if var not in os.environ]
if missing:
    raise EnvironmentError(f"Missing required env vars: {', '.join(missing)}")

GMAIL_USER = os.environ['GMAIL_USER']
GMAIL_PASS = os.environ['GMAIL_PASS']
TEACHER_EMAIL = os.environ['TEACHER_EMAIL']

@app.route('/')
def home():
    return jsonify({"message": "English Level Placement Test Backend is running."})

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    name = data.get('name', '').strip()
    score = data.get('score')
    level = data.get('level')

    if not name or not isinstance(name, str) or len(name) > 100:
        return jsonify({"error": "Invalid or missing student name (max 100 characters)."}), 400

    if not isinstance(score, int) or score < 0 or score > 6:
        return jsonify({"error": "Invalid score: must be an integer between 0 and 6."}), 400

    if level not in ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']:
        return jsonify({"error": "Invalid level: must be A1, A2, B1, B2, C1, or C2."}), 400

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"English Placement Test Results for {name}"
    msg["From"] = GMAIL_USER
    msg["To"] = TEACHER_EMAIL

    text = f"Student: {name}\nScore: {score} out of 6\nLevel: {level}"
    html = f"""
    <h2>English Placement Test Results</h2>
    <p><strong>Student:</strong> {name}</p>
    <p><strong>Score:</strong> {score} out of 6</p>
    <p><strong>Level:</strong> {level}</p>
    """

    msg.attach(MIMEText(text, "plain"))
    msg.attach(MIMEText(html, "html"))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(GMAIL_USER, GMAIL_PASS)
            server.sendmail(GMAIL_USER, TEACHER_EMAIL, msg.as_string())
        print(f"📧 Email sent to {TEACHER_EMAIL} for {name}")
        return jsonify({"message": "Email sent successfully."})
    except Exception as e:
        print("❌ Error sending email:", e)
        return jsonify({"error": "Failed to send email.", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(port=3000, debug=True)
