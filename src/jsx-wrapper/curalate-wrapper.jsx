import React, { Component } from "react";

const isBrowser = typeof window === "undefined";

const _curalateMock = {
  crl8: {
    ready: () => { },
  },
};

const curalateWindow = () => {
  //wrap the call to window to prevent SSR from accesing window incorrectly
  if (!isBrowser) {
    return _curalateMock;
  }
  if (window) return window;
  return _curalateMock;
};

class CuralateWrapper extends Component {
  _CURALATE_FILTER = "productId:";

  _createExperience = () => {
    return curalateWindow()
      .crl8.createExperience(this.props.containerId)
      .catch(e => { });
  };

  _destroyExperience = () => {
    try {
      return curalateWindow()
        .crl8.destroyExperience(this.props.containerId)
        .catch(e => {
          this._createExperience();
        });
    } catch (ex) {
      //curalate is supposed to wrap its functions in promises but occasionally the result of destroy experience
      //fails and isn't returned as a promise, which throws an exception for the .catch call above. nice.
    }
  };

  _getExperience = () => {
    return curalateWindow()
      .crl8.getExperience(this.props.containerId)
      .catch(e => { });
  };

  _crl8OnReady = (callback) => {
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
    return isBrowser ? (
      <div
        data-crl8-container-id={this.props.containerId}
        data-crl8-filter={this.props.filterCriteria ? this._CURALATE_FILTER + this.props.filterCriteria : ""}
      />
    ) : (
        ""
      );
  }
}

export default CuralateWrapper;
