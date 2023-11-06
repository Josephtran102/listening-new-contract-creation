Ethereum Contract Watcher
This is a simple Ethereum contract watcher that allows you to monitor and receive notifications about new contract creations on the Ethereum blockchain.

Usage Guide
Step 1: Set Up Your Environment
Install Node.js: Make sure you have Node.js installed on your computer. You can check your current Node.js version by running node -v in your command line.

Sign up for an account on Infura: To use Infura, you'll need to create an account and obtain an API key from their website.

Step 2: Install the Code
Download the source code from your repository or clone it with the following command:

bash
Copy code
git clone https://.........
Navigate to your project directory:

bash
Copy code
cd your-project
Install dependencies using npm:

bash
Copy code
npm install
Step 3: Configuration
In your source code folder, open the index.js file using your preferred text editor.

Find the following line and replace 'YOUR_API_KEY' with your Infura API key:

javascript
Copy code
const web3 = new Web3('wss://mainnet.infura.io/ws/v3/YOUR_API_KEY');
Step 4: Run the Application
You've now completed the setup and configuration. To run the application, simply execute the following command in your source code directory:

bash
Copy code
node event.js
The application will start monitoring new contract creation events on the Ethereum network and display notifications when an event occurs.

Step 5: Customization
You can customize the source code or notifications to suit your preferences by editing the index.js file.

Notes
Ensure that your computer has a working internet connection so the application can connect to the Ethereum network via Infura.

You can change the notification sound options by modifying the event.js file.

Please note that this source code is designed to monitor new contract creation events on the main Ethereum network (mainnet). You can change the specific network as needed.