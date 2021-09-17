import gi
from gi.repository import Gtk

class Error_Dialogo:
    def __init__(self, message, view, controller):
        print("dialog")
        dialog = Gtk.Dialog()
        dialog.set_title("Error")
        dialog.set_transient_for(view)
        dialog.set_modal(True)
        dialog.add_button(button_text="OK", response_id=Gtk.ResponseType.OK)
        dialog.connect("response", controller.close)
        content_area = dialog.get_content_area()
        label = Gtk.Label(message)
        content_area.add(label)
        dialog.show_all()
