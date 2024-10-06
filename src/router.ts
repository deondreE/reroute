import * as http from 'http';

type Route = {
  route: string,
  bodyType: string,
  process: (req: http.IncomingMessage, res: http.ServerResponse) => void;
}

class Router {
  private routes: Route[] = [];

  createRoute(routeObject: Route): void {
    if (routeObject && routeObject.route && typeof routeObject.process === 'function') {
      this.routes.push(routeObject);
    } else {
      throw new Error('Invalid route object');
    }
  }

  createRoutes(routesArray: Route[]): void {
    if (Array.isArray(routesArray)) {
      routesArray.forEach(route => {
        this.createRoute(route);
      });
    } else {
      throw new Error('Route should be an array');
    }
  }

  start(port: number): void {
    const server = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });

    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }

  private handleRequest(req: http.IncomingMessage, res: http.ServerResponse): void {
    const matchedRoute = this.routes.find(route => route.route === req.url);

    if (matchedRoute) {
      matchedRoute.process(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Route not found');
    }
  }
}

export default Router;