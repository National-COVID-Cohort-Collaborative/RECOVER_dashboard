import asyncio

import tornado.web

from api.handlers import HANDLERS


def make_app():
    return tornado.web.Application(HANDLERS)


async def main():
    app = make_app()
    app.listen(8888)
    await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(main())
