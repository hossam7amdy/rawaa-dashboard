# ERD: admin dashboard

This document explores the design of admin dashboard, a UI management tool for managing Rawaa food app.

We'll use a basic client/server architecture, where a single server is deployed on a cloud provider next to a relational database, and serving HTTP traffic from a public endpoint.

### API

**Customers**

```
/customers/list [GET]
```

**Orders**

```
/orders/list [GET]
```

**Staff**

```
/staff/new [POST]
/staff/list [GET]
/staff/edit [PUT]
```

**Categories**

```
/categories/new [POST]
/categories/list [GET]
/categories/edit [PUT]
/categories/:id [DELETE]
```

**Products**

```
/products/new [POST]
/products/list [GET]
/products/edit [PUT]
/products/:id [DELETE]
```

**Restaurants**

```
/restaurants/new [POST]
/restaurants/list [GET]
/restaurants/edit [PUT]
/restaurants/:id [DELETE]
```

## Clients

For now we'll start with a single web client, possibly adding mobile clients later.

The web client will be implemented in React.js.
Uses React-router for routing between different pages
API server will serve a static bundle of the React app.
Uses Chakra UI for building the CSS components.

## Hosting

The code will be hosted on Github.

The web client will be hosted using any free web hosting platform such as firebase
or netlify. A domain will be purchased for the site, and configured to point to the
web host's server public IP.

We'll deploy the server to a (likely shared) VPS for flexibility. The VM will have
HTTP/HTTPS ports open, and we'll start with a manual deployment, to be automated
later using Github actions or similar. The server will have closed CORS policy except
for the domain name and the web host server.
