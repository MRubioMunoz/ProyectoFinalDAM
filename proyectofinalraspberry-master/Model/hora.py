import time
class hora:
    hora = ''
    dia = ''
    email = ''
    IDLlave = ''
    def __init__(self, email, IDLlave):
        self.email = email
        self.IDLlave = IDLlave
        
    def to_dict(self):
         dest = {
         u'Hora': time.strftime("%H:%M:%S"),
         u'Dia' : time.strftime("%d/%m/%y"),
         u'Email': self.email,
         u'IDLlave': self.IDLlave
         }
         if self.email:
             dest[u'Email'] = self.email
         if self.IDLlave:
            dest[u'IDLlave'] = self.IDLlave    
         return dest