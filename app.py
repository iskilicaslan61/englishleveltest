from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
import os

# .env içeriğini yükle
load_dotenv()

app = Flask(__name__)
CORS(app)


# Ana sayfa: HTML test arayüzü
@app.route('/')
def index():
    return render_template('index.html')  # templates klasöründen index.html yüklenir

# E-posta gönderme API'si
@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = request.get_json()
        name = data.get('name')
        score = data.get('score')
        level = data.get('level')

        # SMTP ayarları
        smtp_server = "smtp.gmail.com"
        smtp_port = 587
        smtp_user = os.getenv("GMAIL_USER")
        smtp_pass = os.getenv("GMAIL_PASS")
        to_email = os.getenv("TEACHER_EMAIL")

        # Mail içeriği
        subject = "📘 New Placement Test Result"
        body = f"👤 Student: {name}\n📊 Score: {score}/6\n🧠 Level: {level}"

        msg = MIMEText(body)
        msg['Subject'] = subject
        msg['From'] = smtp_user
        msg['To'] = to_email

        # Mail gönderimi
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)

        return jsonify({"message": "Email sent successfully!"}), 200

    except Exception as e:
        print("❌ Error sending email:", e)
        return jsonify({"error": str(e)}), 500

# Sağlık kontrolü (Render test için)
@app.route('/health')
def health():
    return jsonify({"message": "English Level Placement Test Backend is running."})
# Uygulamayı çalıştır
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)