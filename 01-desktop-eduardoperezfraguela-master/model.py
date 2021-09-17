import gettext
_ = gettext.gettext
N_ = gettext.ngettext

class Nota :
    def __init__(self):
        self.notas = [_("do"), _("do♯/re♭"), _("re"), _("re♯/mi♭"), _("mi"), _("fa"), _("fa♯/sol♭"), _("sol"), _("sol♯/la♭"), _("la"), _("la♯/si♭"), _("si")]

class Intervalos :
    def __init__(self):
        self.intervalos = {}

class Canciones :
    def __init__(self):
        self.canciones = []