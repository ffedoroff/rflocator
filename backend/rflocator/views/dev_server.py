import os

from django.http import HttpResponse

from rfsite.settings import BASE_DIR


def dev_static_files(request):
    #  for dev local server only
    build_path = os.path.dirname(BASE_DIR) + "/frontend/build/"
    _path = request.path
    if _path.startswith("/static_files/"):
        _path = _path[14:]
    _file = build_path + _path
    filename, file_extension = os.path.splitext(_file)
    ct = ""
    if file_extension == ".js":
        ct = "text/js"
    elif file_extension == ".css":
        ct = "text/css"
    if not os.path.isfile(_file):
        _file = build_path + "/index.html"
    return HttpResponse(open(_file, "rb"), content_type=ct)
