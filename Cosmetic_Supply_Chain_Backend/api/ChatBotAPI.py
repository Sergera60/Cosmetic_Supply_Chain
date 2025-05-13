from flask import Blueprint, render_template, request, jsonify
from models.models import Order
from transformers import AutoModelForCausalLM, AutoTokenizer
from app_extensions import db, mail
from flask_mail import Message

import torch

chatbot_bp = Blueprint('chatbot', __name__)

tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")



@chatbot_bp.route("/chatbot", methods=["POST"])
def chatbot():
    user_message = request.json.get('message')
    if user_message.strip().lower() == 'confirmer':
        try:
            send_confirmation_email('chaymariahi961@gmail.com')
            return jsonify({'response': "Commande confirmée ! Un email a été envoyé."})
        except Exception as e:
            print(e)
            return jsonify({'response': "Erreur lors de l'envoi de l'email."})
    else:
        return jsonify({'response': get_Chat_response(user_message)})




def send_confirmation_email(recipient_email):
    subject = "Confirmation de votre commande"
    msg = Message(subject, recipients=[recipient_email])
    msg.body = "Votre commande a été confirmée et est en cours de traitement. Merci !"
    mail.send(msg)



def get_Chat_response(text):
    text_lower = text.lower()
    text_upper = text.upper()

    if "commande" in text_lower or "order" in text_lower:
        orders = Order.query.order_by(Order.OrderDate.desc()).limit(5).all()
        if not orders:
            return "Aucune commande trouvée."
        response = "Voici les dernières commandes :\n"
        for order in orders:
            response += f"- ID : {order.OrderID}, Produit : {order.Product_ID}, Quantité : {order.Quantity}, Prix : {order.Price_TND} TND, Adresse : {order.ShippingAddress}\n"
        return response

    elif "prix" in text_lower or "price" in text_lower:
        orders = Order.query.all()
        orders_sorted = sorted(orders, key=lambda o: float(o.Price_TND), reverse=True)[:5]
        if not orders_sorted:
            return "Pas de prix trouvés."
        response = "Voici les produits les plus chers :\n"
        for order in orders_sorted:
            response += f"- Produit : {order.Product_ID}, Prix : {order.Price_TND} TND\n"
        return response

    elif "ORD-" in text_upper:
        order = Order.query.filter_by(OrderID=text_upper).first()
        if order:
            return (
                f"Détails de la commande {order.OrderID} :\n"
                f"- Produit : {order.Product_ID}\n"
                f"- Quantité : {order.Quantity}\n"
                f"- Prix : {order.Price_TND} TND\n"
                f"- Adresse : {order.ShippingAddress}\n"
                f"- Date : {order.OrderDate.strftime('%d/%m/%Y') if order.OrderDate else 'N/A'}"
            )
        else:
            return f"Aucune commande trouvée avec l'ID {text_upper}."

    else:
        new_input_ids = tokenizer.encode(text + tokenizer.eos_token, return_tensors='pt')
        chat_history_ids = model.generate(new_input_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)
        return tokenizer.decode(chat_history_ids[:, new_input_ids.shape[-1]:][0], skip_special_tokens=True)
