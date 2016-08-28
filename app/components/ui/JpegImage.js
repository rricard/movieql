/* @flow */

import React from 'react';
import {
  View,
  Image,
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';


type JpegImageProps = {
  uri: string,
  style: any,
};

class JpegImage extends React.Component {
  props: JpegImageProps;
  state: {
    base64: ?string,
  };

  constructor(props: JpegImageProps) {
    super(props);
    this.state = {
      base64: null,
    };
  }

  componentDidMount() {
    this._fetchImage();
  }

  componentWillReceiveProps(nextProps: JpegImageProps) {
    if (this.props.uri !== nextProps.uri) {
      this._fetchImage();
    }
  }

  render(): ?React.Element<any> {
    const {style} = this.props;
    const {base64} = this.state;
    return (
      base64 ?
        <Image style={style} source={{
          isStatic: true,
          uri: `data:image/jpeg;base64,${base64}`,
        }} /> :
        <View style={style} />
    );
  }

  _fetchImage() {
    RNFetchBlob.fetch('GET', this.props.uri.replace('http:', 'https:'))
    .then(res => res.base64())
    .then(base64 => this.setState({base64}))
    .catch(e => {
      e.message = `${e.message} - ${this.props.uri}`;
      console.error(e);
    });
  }
}

export default JpegImage;
