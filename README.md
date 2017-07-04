# Storybook Groups
Add groups to the react storybook

## Install

```sh
$ npm i storybook-groups
```

## Example

```js
import {addGroups, Group} from "storybook-groups"

storiesOf('Button', module)
    .add('with text', () => (
        <Group name="buttons">
            <Button onClick={action('clicked')}>Hello Button</Button>
        </Group>
    ))

addGroups(storiesOf, module, getStorybook)
```


## With knobs example

```js
import {withGroups, Groups} from "storybook-groups"

const stories = storiesOf('Storybook Knobs', module);

stories.addDecorator(withKnobs);
stories.addDecorator(withGroups);

stories.add('with a button 1-button1', () => (

  <button >
{text('Button1', 'Hello Button 1')}
  </button>

))

stories.add('All', () => ( <Groups/> ))
```

**button1** is group name
