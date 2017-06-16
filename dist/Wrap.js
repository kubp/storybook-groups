import React from 'react';

import PropTypes from 'prop-types';

export default class Wrap extends React.Component{
  constructor(props) {
    super(props);
  }

  getChildContext() {
      return {"storybookGroupsKind": this.props.context.kind};
    }

  render(){
    return <div>{this.props.storyFn()}</div>
  }

}


Wrap.childContextTypes = {
  storybookGroupsKind: PropTypes.string
};
