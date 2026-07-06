# Store

Global state containers shared across routes.

The project currently uses React Context for cart state because cart data is needed in multiple distant parts of the tree (navbar counter, product cards, cart page, checkout summary).

Keep this folder for cross-route state only. Local UI state should remain inside components.
