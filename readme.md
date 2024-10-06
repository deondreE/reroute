# rover

the idea is simple what if this:

```javascript
  let router = new Router(); 

  router.createRoute = {
    route: '',
    bodyType: '',
    process: (request) => {},
  };

  // or

  router.createRoutes = [
    {
      route: '/hello',
      bodyType: '',
      process: (request) => {},
    }
  ]

  router.start(1337);
```