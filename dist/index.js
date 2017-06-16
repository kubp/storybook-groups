import React from 'react';
import { withKnobs, text, boolean, number } from '@kadira/storybook-addon-knobs';

import  {getStorybook } from '@kadira/storybook';

import ReactDOMServer from 'react-dom/server'

import GroupManager from "./GroupManager"

import Wrap from "./Wrap"

import PropTypes from 'prop-types';

var manager = new GroupManager();

export const withGroups = function(storyFn, context){
  var all = manager.groupStore
  var props = {storyFn, context, all}
  return <Wrap {...props}/>
}

const css = {
  title: {
    fontFamily: '-apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
    color: "rgb(68, 68, 68)",
    marginTop: "0px"

  },
  item: {
    background: "#f7f7f7",
    marginTop: "10px",
    padding: 10,
    borderRadius: "4px"
  }
};


export class GroupComponent extends React.Component{
  constructor(props) {
    super(props);
    this.state = {mounted: false}
  }

  componentDidMount(){
    var storybook = this.props.getStorybook();
    for (var i = 0; i < storybook.length; i++) {
      if(storybook[i].kind === this.context.storybookGroupsKind){
          var story = storybook[i];
      }
    }

    //dodelat pro vic
    for (var i = 0; i < story.stories.length-1; i++) {
      var context = {kind: story.kind, story:story.stories[i].name }
      story.stories[i].render(context)
        manager.wrap(story.stories[i].render(context), context)
    }

    this.setState({mounted: true})
  }


  makeGroups(store){
    var storeKeys = Object.keys(store)

    var group = {}
    var g = []

    for (var i = 0; i <storeKeys.length; i++) {
      if(!group[storeKeys[i].split("-")[1]]){
        group[storeKeys[i].split("-")[1]] = []
      }

      if(storeKeys[i].split(":")[0] === this.context.storybookGroupsKind){
        group[storeKeys[i].split("-")[1]].push(store[storeKeys[i]])
      }
    }

    for (var i = 0; i < Object.keys(group).length; i++) {
      if(group[Object.keys(group)[i]].length !== 0){
        g.push({name: Object.keys(group)[i], items: group[Object.keys(group)[i]] })
      }
    }

    return g
  }

  render(){
    return <div>
      {this.makeGroups(manager.groupStore).map(function(v,index){
        return <div key={index} style={css.item}>
            <h1 style={css.title}>{v.name}</h1>
            {v.items.map(function(h, index){
              return <div key={index}>{h}</div>
            })}
          </div>
        }, this)}
        </div>
   }

}
GroupComponent.contextTypes = {
  storybookGroupsKind: PropTypes.string
};

//with knobs
export const Groups = function(){
    return <GroupComponent groupStore={manager.groupStore} getStorybook={getStorybook}/>
}



//without knobs
export const Group = ({ children }) => React.Children.only(children);

export const addGroups = function(storiesOf, m, storybook){

    const stories = storybook();

    const kinds = stories.reduce((acc, next) => Object.assign({}, acc, {
      [next.kind]: next.stories
        .map(story => story.render())
        .filter(node => node.type === Group)
        .reduce((acc, node) => {
          if (acc[node.props.name]) {
            acc[node.props.name].push(node.props.children);
            return acc;
          }
          acc[node.props.name] = [node.props.children];
          return acc;
        }, {}),
    }), {});

    Object
      .keys(kinds)
      .forEach(kind => {
        storiesOf(kind, m)
          .add('All', () => (
            <div style={css.container}>
              {Object.keys(kinds[kind]).map(name => (
                <div style={css.item} key={name}>
                  <h3 style={css.title}>{name}</h3>
                  {kinds[kind][name]}
                </div>
              ))}
            </div>
          ));
      });

}
