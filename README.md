# Android Malware Detection Web App

## Description:

An Android malware detection website performs features like Cuckoo Sandbox, checking Android Malware (APK files). You can deploy it on local and test it. This research is experimented and evaluated by:

- [khangtictoc](https://github.com/khangtictoc)
- [ndxbinh1922001](https://github.com/ndxbinh1922001)

Link for quick demo: https://youtu.be/xLlwO3kqXB4

Techstack:

| Name | Technology | 
|-- | -- | 
| OS | Ubuntu 20.04 |
| Frontend | NextJS, TailwindCSS |
| Backend | Flask server | 
| Database | (Not used) | 

Web UI:  

![image](https://github.com/khangtictoc/Thesis-Demo/assets/48288606/29b5c054-722e-4dac-984e-95ef68dab1d0)


## Install & Set up:


### Frontend

- From <a href="/client/">/client</a> folder. Install npm packages

```bash
npm i
```

- Download NVM (Node Version Manager), install newest NVM 

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

- Restart your terminal. Install NodeJS version 18.12.1

```
nvm install v18.12.1
```

- Initialize WebUI

```bash
npm run dev
```

Now you can access WebUI on http://localhost:3000

### Backend

- You must use root privilege to install Python pip packages.

```bash
sudo pip install -r requirement.txt
```

- Put this model file ["Keras_hub_large.h5"](https://github.com/khangtictoc/Thesis.Text_base_Android_malware_classification.Model/blob/main/Output%20Model/Keras_hub_large.h5) into <a href="/flask-server/models/">/models</a> 

- From <a href="/flask-server/">/flask-server</a> folder. Initialize Flask server

```bash
sudo python3 app.py
```

Backend server now runs on http://localhost:5000
