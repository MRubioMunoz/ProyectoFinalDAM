class persona:
    nombre = ''
    apellidos = ''
    email = ''
    IDLlave = ''
    def __init__(self, IDLlave):
        self.IDLlave = IDLlave
        
    def to_dict(self):
         dest = {
         u'Nombre': '',
         u'Apellidos' : '',
         u'Email': '',
         'IDLlave': self.IDLlave
         }
         if self.IDLlave:
            dest[u'IDLlave'] = self.IDLlave    
         return dest