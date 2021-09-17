#!/usr/bin/env python3
import gettext
import gi
gi.require_version('Gtk','3.0')
from gi.repository import Gtk, Atk, Gio, GObject
import webbrowser
_ = gettext.gettext
N_ = gettext.ngettext

class ComboBoxWindow(Gtk.Window):
    def __init__(self, controller):
        Gtk.Window.__init__(self, title=_("APLICACION MUSICAL"))
        
        #Atributos declarados
        self._controller = controller
        self._intervalos = []
        self._ad = [_("ASCENDENTE"), _("DESCENDENTE")]
        self._intervals_store = Gtk.ListStore(str)
        self._intervals_combo = Gtk.ComboBox.new_with_model(self._intervals_store)
        self._asdes_combo = Gtk.ComboBoxText()
        self._buscar_button = Gtk.Button.new_with_mnemonic(_("_Buscar"))
        self._cancion_table_model = Gtk.ListStore(str, str, str)
        self._cancion_table = Gtk.TreeView(self._cancion_table_model)
        self._cancion_table.connect("cursor-changed", self._on_link_click)
        self._cancion_table_headers = [_("NOMBRE"), _("ENLACE"), _("FAVORITA")]


        #caja grande
        self._vbox = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=6)
        #caja combobox y boton
        self._hbox = Gtk.Box(orientation = Gtk.Orientation.HORIZONTAL, spacing = 10)
        #combobox intervals
        self._ibox = Gtk.Box(orientation = Gtk.Orientation.HORIZONTAL, spacing = 10)

        self.set_border_width(10)
        self.set_default_size(700, 700)

        self._prepare_view()


    def _prepare_intervals_combobox(self):
        '''
        Intervalos de la combobox
        '''
        for intervals in self._intervalos:
            self._intervals_store.append([intervals])

        self._intervals_combo.connect("changed", self._controller.on_intervals_combo_changed)
        renderer_text = Gtk.CellRendererText()
        self._intervals_combo.pack_start(renderer_text, True)
        self._intervals_combo.add_attribute(renderer_text, "text", 0)

    def update_intervarls(self):
        print(self._intervalos)
        for intervals in self._intervalos:
            self._intervals_store.append([intervals])

    def _prepare_asdes_combobox(self):
        '''
        Ascendente/Descendente
        '''
        self._asdes_combo.connect("changed", self._controller.on_asdes_combo_changed)
        for asdes in self._ad:
            self._asdes_combo.append_text(asdes)

    def _prepare_buscar_button(self):
        self._buscar_button.connect("clicked", self._controller.get_songs_thread)
        

    def _prepare_table(self):
        '''
        TreeView
        Se declaran las columnas nombre, enlace y favorito del treeviewer
        '''
        self._r_nombre = Gtk.CellRendererText()
        self._c_nombre = Gtk.TreeViewColumn(self._cancion_table_headers[0], self._r_nombre, text=0)
        self._c_nombre.set_resizable(True)
        self._c_nombre.set_min_width(400)
        self._cancion_table.append_column(self._c_nombre)
        self._c_nombre.set_sort_column_id(0)

        self._r_enlace = Gtk.CellRendererText()
        self._c_enlace = Gtk.TreeViewColumn(self._cancion_table_headers[1], self._r_enlace, text=1)
        self._c_enlace.set_resizable(True)
        self._c_enlace.set_min_width(200)
        self._cancion_table.append_column(self._c_enlace)
        self._c_enlace.set_sort_column_id(1)

        self._r_fav = Gtk.CellRendererText()
        self._c_fav = Gtk.TreeViewColumn(self._cancion_table_headers[2], self._r_fav, text=2)
        self._c_fav.set_resizable(True)
        self._c_fav.set_min_width(50)
        self._cancion_table.append_column(self._c_fav)
        self._c_fav.set_sort_column_id(2)

    def _prepare_write(self):
        self._nota_area_contenido = Gtk.TextBuffer()
        self._nota_area = Gtk.TextView(buffer = self._nota_area_contenido)
        self._nota_area.set_editable(False)

    def _pack_elements(self):
        self._ibox.pack_start(Gtk.Label(_("Intervalos:")),False, False , 2)
        self._ibox.pack_start(self._intervals_combo, False, False, 10)

        self._hbox.pack_start(self._ibox, False, False, 100)
        self._hbox.pack_start(Gtk.Label(_("Orden:")),False, False, 2)
        self._hbox.pack_start(self._asdes_combo, False, False, 0)
        self._hbox.pack_start(self._buscar_button, True, True, 0)

        self._vbox.pack_start(self._hbox, False, False, 5)

        self._vbox.pack_start(self._cancion_table, False, False, 5)

        self._vbox.pack_start(self._nota_area, False, False, 5)
        
        self.add(self._vbox)

    def _prepare_view(self):
        self._prepare_intervals_combobox()
        self._prepare_asdes_combobox()
        self._prepare_buscar_button()
        self._prepare_table()
        self._prepare_write()
        self._pack_elements()


    def _on_link_click(self, widget):
        (model, pathlist) = self._cancion_table.get_selection().get_selected_rows()
        for path in pathlist :
            tree_iter = model.get_iter(path)
            value = model.get_value(tree_iter,1)
            print (value)
        if value != "":
            webbrowser.open_new_tab(value)

    



if __name__ == "__main__":

    win = ComboBoxWindow()
    win.connect("destroy", Gtk.main_quit)
    win.show_all()
    Gtk.main()
