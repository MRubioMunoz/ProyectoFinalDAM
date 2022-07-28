import firebase_admin
from firebase_admin import credentials, firestore
from py532lib.i2c import *
from py532lib.frame import *
from py532lib.constants import *
from datetime import datetime
import time
from Model.hora import hora
from Model.persona import persona
from Model.helper import helper

pn532 = Pn532_i2c()
pn532.SAMconfigure()
cred = credentials.Certificate('./firebaseID.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()
while True:
    time.sleep(2)
    print('¡Pase una llave por el lector!')
    card_data = pn532.read_mifare().get_data()
    id_key = helper.get_id_card(card_data)
    snapshots = db.collection(u'persona').document(id_key).get().to_dict()
    if snapshots is None:
        doc_ref = db.collection(u'persona').document(id_key)
        doc_ref.set(persona(id_key).to_dict())
        print('Nueva ID añadida. Hable con el administrador para terminar el proceso de inserción \n')
    elif snapshots['Email'] != '':
        doc_ref = db.collection(u'hora').document()
        doc_ref.set(hora(snapshots['Email'], id_key).to_dict())
        print('Hora registrada. ¡Que pase un buen día! \n')
    else:
        print('La llave esta en la base de datos pero sus datos no estan completados, hable con el administrador \n')