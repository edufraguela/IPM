'''
Eduardo Pérez Fraguela y Sergio Rega Domato
Logins_UDC: eduardo.perez.fraguela y s.rdomato
Logins_Github: eduardoperezfraguela y srdomato
'''

#!/usr/bin/env python3
from p1 import e2e

import sys
import textwrap
from collections import namedtuple

import gi
gi.require_version('Atspi', '2.0')
from gi.repository import Atspi

import e2e

"""
    Histories:
    GIVEN he lanzado la aplicación
    WHEN selecciono el intervalo '3M'
    WHEN selecciono el sentido 'asc'
    WHEN pulso el boton 'Buscar'
    THEN veo las canciones correspondientes
"""

# Funciones de ayuda

def show(text):
    print(textwrap.dedent(text))

def show_passed():
    print('\033[92m', "    Passed", '\033[0m')

def show_not_passed(e):
    print('\033[91m', "    Not passsed", '\033[0m')
    print(textwrap.indent(str(e), "    "))


# Contexto de las pruebas

Ctx = namedtuple("Ctx", "path process app")


# Implementación de los pasos

def given_he_lanzado_la_aplicacion(ctx):
    process, app = e2e.run(ctx.path)
    assert app is not None
    return Ctx(path= ctx.path, process= process, app= app)

def when_selecciono_intervalo(ctx):
    gen = (node for _path, node in e2e.tree(ctx.app) if node.get_role_name() == 'combo box')
    cbox = next(gen, None)
    assert cbox is not None
    e2e.do_action(cbox, 'press')
    gen = (node for _path, node in e2e.tree(ctx.app) if node.get_role_name() == 'menu item' and node.get_name() == '3M')
    mitem = next(gen, None)
    assert mitem is not None
    e2e.do_action(mitem, 'click')
    return ctx

def when_selecciono_sentido(ctx):
    gen = (node for _path, node in e2e.tree(ctx.app) if node.get_role_name() == 'combo box')
    cbox2 = next(gen, None)
    assert cbox2 is not None
    e2e.do_action(cbox2, 'press')
    gen = (node for _path, node in e2e.tree(ctx.app) if node.get_role_name() == 'menu item' and node.get_name() == 'ASCENDENTE')
    mitem2 = next(gen, None)
    assert mitem2 is not None
    e2e.do_action(mitem2, 'click')
    return ctx

def when_selecciono_buscar(ctx):
    gen = (node for _path, node in e2e.tree(ctx.app) if node.get_role_name() == 'push button' and node.get_name() == 'Buscar')
    boton = next(gen, None)
    assert boton is not None
    e2e.do_action(boton, 'click')
    return ctx

def then_veo_el_texto_correspondiente(ctx):
    gen = (node for _path, node in e2e.tree(ctx.app) if node.get_role_name() == 'table cell' and node.get_text(0, -1).startswith("La primavera"))
    label = next(gen, None)
    assert label and label.get_text(0, -1) == "La primavera (Vivaldi)", label.get_text(0, -1)
    return ctx


if __name__ == '__main__':
    sut_path = sys.argv[1]
    initial_ctx = Ctx(path= sut_path, process= None, app= None)

    show("""
    GIVEN he lanzado la aplicación
    WHEN selecciono el intervalo '3M'
    WHEN selecciono el sentido 'asc'
    WHEN pulso el boton 'Buscar'
    THEN veo las canciones correspondientes
    """)
    ctx = initial_ctx
    try:
        ctx = given_he_lanzado_la_aplicacion(ctx)
        ctx = when_selecciono_intervalo(ctx)
        ctx = when_selecciono_sentido(ctx)
        ctx = when_selecciono_buscar(ctx)
        ctx = then_veo_el_texto_correspondiente(ctx)
        show_passed()
    except Exception as e:
        show_not_passed(e)
    e2e.stop(ctx.process)

    
    