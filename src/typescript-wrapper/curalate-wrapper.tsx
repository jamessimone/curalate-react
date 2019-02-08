import React, { Component } from "react";

const isBrowser = typeof window === "undefined";

type CuralateWindow = Window & {
  crl8: any;
};

type Props = {
  experienceName: string;
  containerId: string;
  filterCriteria?: string;
};

const _curalateMock = {
  crl8: {
    ready: () => {},
  },
};

const curalateWindow = () => {
  //wrap the call to window to prevent SSR from accesing window incorrectly
  if (!isBrowser) {
    return _curalateMock;
  }
  if (window) return window as CuralateWindow;
  return _curalateMock;
};

class CuralateWrapper extends Component<Props> {
  readonly CURALATE_FILTER: string = "productId:";

  _createExperience = (): Promise<any> => {
    return curalateWindow()
      .crl8.createExperience(this.props.containerId)
      .catch(e => {});
  };

  _destroyExperience = (): Promise<any> => {
    try {
      return curalateWindow()
        .crl8.destroyExperience(this.props.containerId)
        .catch(e => {
          this._createExperience();
        });
    } catch (ex) {
      //curalate is supposed to wrap its functions in promises but occasionally the result of destroyExperience
      //fails and isn't returned as a promise, which throws an exception for the .catch call above. nice.
    }
  };

  _getExperience = (): Promise<any> => {
    return curalateWindow()
      .crl8.getExperience(this.props.containerId)
      .catch(e => {});
  };

  _crl8OnReady = (callback: () => void) => {
    curalateWindow().crl8.ready(() => {
      this._getExperience().then(callback);
    });
  };

  componentDidMount() {
    this._crl8OnReady(this._createExperience);
  }

  componentWillUnmount() {
    const unmountCb = this._destroyExperience;

    this._crl8OnReady(unmountCb);
  }

  render() {
    //the returned element doesn't have to be a div
    //I personally use styled-components to style the returned element
    //but anything can be used as long as it has the container-id data prop on it
    return isBrowser ? (
        <div
          data-crl8-container-id={this.props.containerId}
          data-crl8-filter={this.props.filterCriteria ? this.CURALATE_FILTER + this.props.filterCriteria : ""}
        />
    ) : (
      ""
    );
  }
}

export default CuralateWrapper;
