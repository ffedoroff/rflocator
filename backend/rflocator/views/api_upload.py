from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rflocator.model.clientdata import ClientData


@csrf_exempt
def api_clientdata_upload(request):
    cdata = ClientData(ip=request.META.get('REMOTE_ADDR'))

    if "LOCN" in request.POST:
        l = request.POST["LOCN"].split(",")
        cdata.loc_network_lat = float(l[0])
        cdata.loc_network_lon = float(l[1])

    if "LOCNACC" in request.POST:
        cdata.loc_network_acc = float(request.POST["LOCNACC"])

    if "LOCNTMS" in request.POST:
        cdata.loc_network_tms = float(request.POST["LOCNTMS"])

    if "LOC" in request.POST:
        l = request.POST["LOC"].split(",")
        cdata.loc_lat = float(l[0])
        cdata.loc_lon = float(l[1])

    if "LOCACC" in request.POST:
        try:
            cdata.loc_acc = float(request.POST["LOCACC"])
        except ValueError:
            pass

    if "LOCTMS" in request.POST:
        try:
            cdata.loc_tms = float(request.POST["LOCTMS"])
        except ValueError:
            pass

    if "qtime" in request.POST:
        try:
            cdata.qtime = int(request.POST["qtime"])
        except ValueError:
            pass

    cdata.source = request.POST.get("source", None)
    cdata.loc_spd = request.POST.get("LOCSPD", None)
    cdata.loc_alt = request.POST.get("LOCALT", None)
    cdata.times = request.POST.get("TIMES", None)
    cdata.ups = request.POST.get("UPS", None)
    cdata.batt = request.POST.get("BATT", None)
    cdata.devid = request.POST.get("DEVID", None)
    cdata.cpufreq = request.POST.get("CPUFREQ", None)
    cdata.cellid = request.POST.get("CELLID", None)
    cdata.cellsig = request.POST.get("CELLSIG", None)

    cdata.log = ""
    for p in request.POST:
        if p not in ["LOC", "LOCACC", "LOCTMS", "LOCSPD", "LOCALT", "TIMES",
                     "UPS", "BATT", "DEVID", "LOCN", "LOCNACC", "LOCNTMS",
                     "CPUFREQ", "CELLID", "CELLSIG", ] \
                and request.POST[p] \
                and "%" + p != request.POST[p]:
            # save all unknown values to log
            cdata.log += "{}='{}'  ".format(p, request.POST[p])

    cdata.save()
    return JsonResponse({"result": "ok"})
