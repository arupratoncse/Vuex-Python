# Vuex-Python Simple Note Application
#PC
![](screenshot/Screenshot_pc.jpg)
#Mobile
![](screenshot/Screenshot_mobile.jpg)
## Default setup
In your computer open terminal and create a project directory
```
mkdir tutorial
cd tutorial
```
Then clone the project
```
git clone https://github.com/arupratoncse/Vuex-Python.git
```
## Js setup
At first install node js then
install vue js in your computer globally
```
npm install -g @vue/cli
```
Now  install all package dependency
```
cd vuex-Python/note_client
npm i
npm run webpack  #for build project
```
## Python setup
In tutorial directory
Create a virtual environment to isolate our package dependencies locally
```
python3 -m venv env
source env/bin/activate  # on windows use 'env\Scripts\activate'
```
The run the below command for installing web framework
```
pip install -r vuex-python/note_server/requirements.txt
```
If an error occurs during installation, update the setuptools and pip versions as they may be out of date.
```
pip install -U pip setuptools
```
## Database migration
```
cd vuex-python/note_server
python manage.py migrate
```
create a superUser
```
python manage.py createsuperuser
```
##Run development server(I am using vagrant)
```
python manage.py runserver 0.0.0.0:8000
```
You can browse from a web browser at http://0.0.0.0:8000/
