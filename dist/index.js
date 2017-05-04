import React from 'react';

export const Group = ({ children }) => React.Children.only(children);

const css = {
  container: {
    margin: "0px",
  },
  title: {
    fontFamily: '-apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
    color: "rgb(68, 68, 68)",
    margin: "0px"

  },
  item: {
    background: "#f7f7f7",
    marginTop: "10px",
    padding: 10,
    borderRadius: "4px"
  }
};

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
