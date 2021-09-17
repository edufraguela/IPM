#!/usr/bin/env python3

import urllib.request
import json
from model import Nota, Intervalos, Canciones
from random import randint
from view import ComboBoxWindow
import gi
from gi.repository import Gtk
import threading
from dialogo_error import Error_Dialogo
import gettext

_ = gettext.gettext
N_ = gettext.ngettext

class Controller:
    def __init__(self):
        self.URL_INTERVAL = 'http://127.0.0.1:5000/intervals'
        self.URL_SONG = 'http://127.0.0.1:5000/songs/'
        self._view = ComboBoxWindow(self)
        self._songs = Canciones()
        t = self.get_intervals_thread()

    def _get_intervals(self):
        req = urllib.request.Request(self.URL_INTERVAL)
        try:
            with urllib.request.urlopen(req) as response:
                data = response.read().decode('utf8')
                data_json = json.loads(data)
                data_in_json = data_json['data']

                intervals = Intervalos()
                intervals.intervalos = data_in_json
                self._view._intervalos = intervals.intervalos

                return intervals.intervalos
        except:
            Error_Dialogo(_("Error accediendo a intervalos"), self._view, self)
            self._view._nota_area_contenido.delete(self._view._nota_area_contenido.get_start_iter(), self._view._nota_area_contenido.get_end_iter())
        
        return None

    def get_intervals_thread(self):
        t = threading.Thread(target=self._get_intervals, daemon=True)
        t.start()
        t.join()

        self._view.update_intervarls()
        return self._view._intervalos

    def _get_songs(self):
        value_intervals_index, value_asdes_index = self._view._intervals_combo.get_active(), self._view._asdes_combo.get_active()
        intervals, ad = list(self._view._intervalos.keys())[value_intervals_index], self._view._ad[value_asdes_index][:3].lower()
        url = self.URL_SONG + intervals + '/' + ad
        req = urllib.request.Request(url)
        try:
            with urllib.request.urlopen(req) as response:
                data = response.read().decode('utf8')
                data_json = json.loads(data)
                data_in_json = data_json['data']

                self._songs.canciones = data_in_json

                return self._songs.canciones
        except:
            Error_Dialogo(_("Error accediendo a canciones"), self._view, self)
            self._view._nota_area_contenido.delete(self._view._nota_area_contenido.get_start_iter(), self._view._nota_area_contenido.get_end_iter())

        return None

    def get_songs_thread(self, widget):
        t = threading.Thread(target=self._get_songs, daemon=True)
        t.start()
        t.join()

        self._action_find()

    def get_note(self, intervalo, ad):
        aleatorio = randint(0, 12)
        aleatorio2 = randint(0, 12)

        while aleatorio == aleatorio2:

            aleatorio2 = randint(0,12)

        siguienteindice = 0
        siguienteindice2 = 0
        print(Nota().notas[aleatorio])
        l1 = sorted(self._view._intervalos, reverse=True)
        l1 = sorted(l1, key=lambda s: s[0])
        if ad == 'ASCENDENTE':

            siguienteindice = (aleatorio + 1 + l1.index(intervalo))%12
            siguienteindice2 = (aleatorio2 + 1 + l1.index(intervalo))%12

        else:

            siguienteindice = (aleatorio - 1 - l1.index(intervalo))%12
            siguienteindice2 = (aleatorio2 - 1 - l1.index(intervalo))%12
        
        print(Nota().notas[siguienteindice])
        
        return Nota().notas[aleatorio], Nota().notas[siguienteindice], Nota().notas[aleatorio2], Nota().notas[siguienteindice2]

    def _action_find(self):
        '''
            Se declaran 2 variables, si el numero de la combobox es mayor a -1 entonces 
            devuelve una lista se que se declara, el keys devueleve los elementos de la clave.
            Se imprime los valores si se cumple, sino, muestra error.
        '''
        value_intervals_index, value_asdes_index = self._view._intervals_combo.get_active(), self._view._asdes_combo.get_active()
        if value_intervals_index > -1 and value_asdes_index > -1:
            value_intervals, value_asdes = list(self._view._intervalos.keys())[value_intervals_index], self._view._ad[value_asdes_index]    
            self._view._cancion_table_model.clear()
            for cancion in self._songs.canciones:
                self._view._cancion_table_model.append([cancion[0], cancion[1], cancion[2]])

            self._view._vbox.pack_start(self._view._cancion_table, False, False, 5)

            self._get_example_note()

        else:
            print("error")

    def _get_example_note(self):
        indice_intervalos = self._view._intervals_combo.get_active()
        nota = self.get_note(list(self._view._intervalos.keys())[indice_intervalos] ,self._view._asdes_combo.get_active_text())
        self._view._nota_area_contenido.delete(self._view._nota_area_contenido.get_start_iter(), self._view._nota_area_contenido.get_end_iter())
        self._view._nota_area_contenido.insert(self._view._nota_area_contenido.get_end_iter(), _("Unos ejemplos de este intervalo podrían ser: ") + nota[0] + ", " +
        nota[1] + _(" y también ") + nota[2] + ", " + nota[3])

    def on_intervals_combo_changed(self, combo):
        tree_iter = combo.get_active_iter()
        if tree_iter is not None:
            model = combo.get_model()
            intervals = model[tree_iter][0]
            print("Selected: intervals = %s" % intervals)

    def on_asdes_combo_changed(self, combo):
        text = combo.get_active_text()
        if text is not None:
            print("Selected: ascendente/descendente = %s" % text)

    def close(self, widget, response):
        print(response)
        widget.destroy()

if __name__ == "__main__":
    intervalo = '2M'
    ad = 'des'
    #print(get_intervals())
    #print(get_songs(intervals,ad))

    win = Controller()._view
    win.connect("destroy", Gtk.main_quit)
    win.show_all()
    Gtk.main()
