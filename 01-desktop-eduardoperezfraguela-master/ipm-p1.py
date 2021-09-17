#!/usr/bin/env python3
from controller import Controller
from gi.repository import Gtk
import gettext
from pathlib import Path
import locale

_ = gettext.gettext
N_ = gettext.ngettext

if __name__ == "__main__":
    locale.setlocale(locale.LC_ALL, '')

    LOCALE_DIR = Path(__file__).parent / "locale"
    locale.bindtextdomain('ipm-p1', LOCALE_DIR)
    gettext.bindtextdomain('ipm-p1', LOCALE_DIR)
    gettext.textdomain('ipm-p1')
    
    win = Controller()._view
    win.connect("destroy", Gtk.main_quit)
    win.show_all()
    Gtk.main()