class helper:
    @staticmethod
    def get_id_card(array):
        id_key = ''
        for x in array:
            id_key += str(x)
        return id_key