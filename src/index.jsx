import CuralateWrapper from "./jsx-wrapper"
import loadCuralate from "./load-curalate";
import ScriptInjector from "./script-injector";

const ExampleCaller = () => {
  //ideally the script injector is loaded in the <head> tag of your app so that the crl8 pixel
  //is available on the window from anywhere within your application
  return (
    <>
      <ScriptInjector scriptCallback={loadCuralate("YOUR_CURALATE_SITE_NAME")} />

      {/* and later ... */}
      <CuralateWrapper
        experienceName="YOUR_EXPERIENCE_NAME"
        containerId="product" //this is the kind of fan reel that you've set up within Curalate
        filterCriteria="YOUR_PRODUCT_ID_IF_APPLICABLE"
      />
    </>
  )
}

export default ExampleCaller;