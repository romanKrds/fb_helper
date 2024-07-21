# Facebook Helper

This tool helps you create Facebook posts based on video transcripts. Just upload the video transcript, and AI will transform it into an engaging Facebook post.

The demo app can be found here:
http://fbhelper.s3-website-us-east-1.amazonaws.com/

## Back-end 

The backend is implemented with Python and Flask. Ensure you have Python 3 installed on your computer. **Caution!** Don't forget to create a `.env` file before development and add your OpenAI API key under the `OPENAI_API_KEY` variable name.

### Install Dependencies

**Optional**: Create and activate the virtual environment:
```
python3 -m venv .venv
source .venv/bin/activate
```

Install dependencies:
```
pip install -r requirements.txt
```

### Start Development Server
Run the following command to start the development server:

```
flask run
```

The server will be running on http://127.0.0.1:5000.

### Run Tests
Run the following command to run tests:
```
pytest
```

### Deployment
Deployment is performed via the Serverless framework. To deploy the API:

Install Serverless framework's dependencies:
```
npm install
```

Deploy the API. You should be authorized in AWS CLI and Serverless CLI. Configuration can be found in the serverless.yml file.
```
serverless deploy
```

## Front-end
The frontend is implemented with TypeScript and Angular. Ensure you have Node.js v18.9.1 or newer installed on your computer.

### Install Dependencies
```
npm install
```

### Start Development Server
Run the following command to start the development server:

```
ng serve
```

### Run Tests
Run the following command to run tests:

```
ng test
```

### Deployment
Build the app with the following command:

```
ng build
```
All the changes will be in the dist folder. Upload files to the S3 bucket.
