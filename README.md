# Curalate-React
Want to load curalate's client side pixel onto your website built with React / Typescript but don't know where to begin?
These recipes should help!

## Getting started
The CuralateWrapper elements found in src/jsx-wrapper || src/typescript-wrapper should be enough to get you started.
Currently they are built as class elements, but if you experience no issue with the component unmounting oddly
(which I have observed during certain client side renders with a SSR'ed app), by all means feel free to adopt
as a functional component.

1. Ensure your fan reel is deployed within Curalate - use the site name provided within Curalate's fan reel section to properly
load the pixel by using the ScriptInjector component.

2. Ensure that the crl8 pixel is loaded prior to using either of the Curalate wrappers. Nothing will be displayed otherwise.
3. Correctly reference the curalate fan reel's type using the containerId prop
4. Add a product filter if you are using a PDP fan reel or if the collection your fan reel is associated with has filterable products.
5. Profit?