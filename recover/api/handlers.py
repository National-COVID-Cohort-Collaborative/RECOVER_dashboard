"""
    N3C RECOVER dashboard data feed wrapper API
    Used to allow access to endpoints with CORS blocks
"""
import json
import requests


from tornado.web import RequestHandler, HTTPError


feeds = {
    'long-covid-summary': 'https://labs.cd2h.org/n3c-cohort/feeds/long_covid_summary.jsp',
    'severity': 'https://n3c.cd2h.org/dashboard/new_ph/long_covid/feeds/severity.jsp',
}

captions = [
    'training_title',
    'training_footer',
    'demographics_title',
    'demographics_footer',
    'intro_paragraphs',
    'model_title',
    'model_footer'
]


class N3CAPIHandler(RequestHandler):
    def get(self, name):
        if not name:
            raise HTTPError(400, reason="name of feed required")
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": "false",
            "Access-Control-Max-Age": "60"
        }
        if name in captions:
            url = f"https://n3c.cd2h.org/dashboard/caption.jsp?tag={name}&schema=n3c_recover.caption"
            headers['Content-Type'] = 'text/html; charset=utf-8'
        elif name in feeds:
            url = feeds[name]
            # data feeds are json
            headers['Content-Type'] = 'application/json; charset=UTF-8'
        else:
            raise HTTPError(404, reason="feed/caption does not exist")
        try:
            r = requests.get(url, headers=headers)
            try:
                self.write(json.dumps(r.json()))
            except json.JSONDecodeError:
                # captions are plain text
                self.write(json.dumps(r.text))
        except requests.exceptions.RequestException as e:
            self.finish(f"Error: failed because {e}")


HANDLERS = [
    (r"/recover/api/(.*)", N3CAPIHandler),
]
