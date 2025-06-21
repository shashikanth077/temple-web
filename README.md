## 🧑‍💻 Getting Started for Local Development

### 📦 Create a New React App

To set up a fresh React project (if not cloned yet):

```bash
npx create-react-app my-app
🔧 Install Node.js (Latest Version)
Make sure you have the latest Node.js installed.
Download here

🛠️ Project Setup Steps
Clone the Repository (latest version from master):
git clone https://github.com/your-username/your-repo.git
cd your-repo

Install Dependencies:
npm install --force
Start the React Development Server:

npm start
This will launch the app at http://localhost:3000

🗃️ Connecting to MongoDB
To connect your application to the MongoDB database:

🔗 MongoDB Connection String
mongodb://@localhost:27017/client_db?authSource=admin
Replace credentials with values from the .env file inside your Node.js backend server.

💡 Tip:
Use MongoDB Compass for an easy GUI-based connection:

Open MongoDB Compass

Paste the connection string

Fill in username/password using .env from the Node.js project

Click Connect
