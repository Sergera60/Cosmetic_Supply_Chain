import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {

    userInput = '';
  messages = [
    { text: 'Hello! How can I help you today?', isUser: false },
  ];

  constructor(private http: HttpClient) {}

  sendMessage() {
    if (this.userInput.trim()) {
      // User's message
      this.messages.push({ text: this.userInput, isUser: true });

      // Make HTTP request to your chatbot API
      this.http
        .post<{ response: string }>('http://localhost:5000/chatbot', {
          message: this.userInput,
        })
        .subscribe(
          (data) => {
            // Bot's message
            this.messages.push({ text: data.response, isUser: false });
          },
          (error) => {
            // Handle any errors
            console.error('Error:', error);
            this.messages.push({
              text: 'Sorry, something went wrong. Please try again.',
              isUser: false,
            });
          }
        );

      // Clear user input
      this.userInput = '';
    }
  }
}
