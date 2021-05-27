#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#
# created by Lipson on 2018/4/7.
# email to LipsonChan@yahoo.com
#
import json
import os
import traceback
from shutil import copyfile

plugins_file = "/www/js/plugins.js"
patch_plugins_file = "patch.json"
key_word = "var $plugins =\n"
pwd = os.path.dirname(os.path.realpath(__file__))


def get_plugins():
    with open(pwd + plugins_file, 'r', encoding='UTF-8') as f:
        s = f.read()
        s = s[s.index(key_word) + len(key_word):s.rfind(';')]
        plugin_list = json.loads(s)
        plugin_tree = {p['name']: p for p in plugin_list}
        return plugin_tree


def get_patch_plugins():
    with open(patch_plugins_file, 'r') as f:
        s = f.read()
        plugin_list = json.loads(s)
        plugin_tree = {p['name']: p for p in plugin_list}
        return plugin_tree


def write_plugins(plugins=list()):
    output = key_word + json.dumps(plugins, indent=True, ensure_ascii=False) + ";"
    with open(pwd + plugins_file, 'w', encoding='UTF-8') as f:
        f.write(output)


def main():
    try:
        copyfile(pwd + plugins_file, pwd + plugins_file + '.bk')
        orgi_plugins = get_plugins()
        patch_plugins = get_patch_plugins()
        for k, v in patch_plugins.items():
            if k not in orgi_plugins:
                orgi_plugins[k] = v
        all_plugins = [v for k, v in orgi_plugins.items()]
        write_plugins(all_plugins)
    except:
        traceback.print_exc()
        pass


if __name__ == "__main__":
    main()
