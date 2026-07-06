# Components

Reusable presentation and interaction building blocks for the application.

- `ui/`: Primitive visual controls (buttons, inputs, selectors) with shared styling rules.
- `layout/`: Structural components that define page chrome and navigation behavior.
- `fragrance/`: Commerce-facing product and collection UI blocks.
- `cart/`: Cart and checkout summary components that consume cart context.

Components should stay focused on rendering concerns. Data retrieval and business rules belong in `config/`, `store/`, and `hooks/`.
