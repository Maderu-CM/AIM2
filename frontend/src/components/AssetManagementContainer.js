import React, { Component } from 'react';
import RequestAsset from './RequestAsset'; 
import ApproveAssetRequest from './ApproveAssetRequest'; 

class AssetManagementContainer extends Component {
  render() {
    return (
      <div>
        <RequestAsset /> 
        <ApproveAssetRequest />
      </div>
    );
  }
}

export default AssetManagementContainer;
