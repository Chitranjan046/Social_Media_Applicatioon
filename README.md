# Social_Media_Applicatioon
Social media web application clone along the lines of  Facebook, and Twitter. This will include functionality of posting, commenting, and sharing other user’s posts, user authentication,  log in using Google authentication, Users can leave comments on posts.
Comments are associated with specific posts and users.


## Features

### User Authentication

- Sign up using a registration form.
- Log in using Google authentication.

### Post Creation

- Authenticated users can create posts with text and optional image uploads.
- Posts are securely stored in the MongoDB database.

### Commenting

- Users can leave comments on posts.
- Comments are associated with specific posts and users.
- Comment notifications are sent via email using nodemailer.

### User Profiles

- Users have profiles showcasing their information.
- Profiles display the user's posts and other relevant details.

### Profile Update

- Users can easily update their profile information.
- Profile images can be updated using the multer library.

### Background Processing

- Utilizes the kue library for efficient background job processing.
- Background jobs are used for sending emails via nodemailer.

## Getting Started

To run the Social Media Web Application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/social-media-app.git`
2. Navigate to the project directory: `cd social-media-app`
3. Install dependencies: `npm install`
4. Set up environment variables:
   - Create a `.env` file and add the following variables:
     ```
     PORT=3000
     MONGODB_URI=your_mongodb_uri
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     SMTP_HOST=your_smtp_host
     SMTP_PORT=your_smtp_port
     SMTP_USER=your_smtp_username
     SMTP_PASS=your_smtp_password
     ```
5. Start the application: `npm start`

Visit `http://localhost:3000` in your web browser to access the application.

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Google Developer Console](https://console.developers.google.com/)
- [kue](https://github.com/Automattic/kue)
- [nodemailer](https://nodemailer.com/about/)
- [multer](https://github.com/expressjs/multer)





